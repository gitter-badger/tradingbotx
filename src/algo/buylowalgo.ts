import {Algo, AlgoInput, AlgoOutput, AlgoActionType} from './algo';

export interface Event {
  currentIndex: number;
  currentPrice: number;
  lastMaxPriceIndex: number;
  lastMaxPrice: number;
  drop: number;
  dropPercent: number;
  dropDuration: number;
  avgDropPerInterval: number;
  dropIntensity: number;
  normalizedDropIntensity?: number;
  normalizedAvgDropPerInterval?: number;
  maxAvgDropPerInterval?: number;
  maxDropIntensity?: number;
}

export class BuyLowAlgo implements Algo {
  /*
   * If stock price is significantly down from its previous high,
   * and if that downturn happens very fast (2-3 months and ~40%+ down, the company usually becomes under value)
   * we should consider buying at that price.
   */
  async run(algoInput: AlgoInput): Promise<AlgoOutput> {
    const events: Event[] = [];
    let n = 1;
    let lastMaxPrice = algoInput.prices[0];
    let lastMaxPriceIndex = 0;
    let maxAvgDropPerInterval = 0;
    let maxDropIntensity = -1;

    // First event for the first price data point
    events.push({
      currentIndex: 0,
      lastMaxPriceIndex: lastMaxPriceIndex,
      currentPrice: algoInput.prices[0],
      lastMaxPrice: lastMaxPrice,
      drop: 0,
      dropPercent: 0,
      dropDuration: 0,
      avgDropPerInterval: 0,
      dropIntensity: 0,
      maxAvgDropPerInterval: 0,
      maxDropIntensity: 0,
      normalizedAvgDropPerInterval: 0,
      normalizedDropIntensity: 0,
    });

    while (n < algoInput.prices.length) {
      if (algoInput.prices[n] > algoInput.prices[n - 1]) {
        if (algoInput.prices[n] > lastMaxPrice) {
          lastMaxPrice = algoInput.prices[n];
          lastMaxPriceIndex = n;
        }
      }

      const drop = lastMaxPrice - algoInput.prices[n];
      const dropPercent = drop / lastMaxPrice;
      const dropDuration = n - lastMaxPriceIndex;
      const e: Event = {
        currentIndex: n,
        lastMaxPriceIndex: lastMaxPriceIndex,
        currentPrice: algoInput.prices[n],
        lastMaxPrice: lastMaxPrice,
        drop: drop,
        dropPercent: drop / lastMaxPrice,
        dropDuration: dropDuration,
        avgDropPerInterval: dropDuration == 0 ? 0 : dropPercent / dropDuration, // percent
        dropIntensity: dropDuration * dropPercent, // how intense the drop is i.e. how fast and how much, both together will exponentially increase the confidence
      };
      maxAvgDropPerInterval = Math.max(
        e.avgDropPerInterval,
        maxAvgDropPerInterval
      );
      maxDropIntensity = Math.max(e.dropIntensity, maxDropIntensity);
      e.maxAvgDropPerInterval = maxAvgDropPerInterval;
      e.maxDropIntensity = maxDropIntensity;

      events.push(e);
      n++;
    }

    const hist: {[key: number]: number} = {};
    n = 0;
    while (n < events.length) {
      // avgDropPerInterval is going to be the likelihood metric
      const e = events[n];
      e.normalizedAvgDropPerInterval =
        e.avgDropPerInterval / maxAvgDropPerInterval;

      if (e.dropIntensity > maxDropIntensity) {
        console.log('ERROR', e.dropIntensity, maxDropIntensity);
      }
      e.normalizedDropIntensity = 100 * (e.dropIntensity / maxDropIntensity);
      n++;
    }

    return {
      indicators: [events.map(e => e.normalizedDropIntensity || 0)],
    };
  }

  actionType(): AlgoActionType {
    return 'buy';
  }

  name(): string {
    return 'Buy Low';
  }
}

// let c = new ConfidenceAlgo();
// console.log(
//   c.predict(
//     {
//       prices: [1, 2, 3, 4, 1, 2, 3, 4],
//     },
//     0.5,
//     0
//   )
// );