import {Request, Response, NextFunction} from 'express';
import moment, {Moment} from 'moment';
import {ALGO_REGISTRY, getAlgoById} from './algo/algoregistry';

/**
 * A generic function to catch all exceptions for the input function and route them to express's next function
 */
export const withTryCatchNext = async (
  req: Request,
  res: Response,
  next: NextFunction,
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  try {
    await func(req, res, next);
  } catch (err) {
    console.log(`Error occurred: ${err} ${err.stack}`);
    next(err);
  }
};

export const getAlgosFromRequest = (req: Request) => {
  const algoIds: string[] = (
    (req.query.algoIds as string) || ALGO_REGISTRY[0].id()
  ).split(',');

  const algosToRun = algoIds.map(a => {
    const algo = getAlgoById(a);
    if (!algo) throw new Error(`Invalid algo name ${a}`);
    return algo;
  });

  return algosToRun;
};

export const getAlgoFromRequest = (req: Request) => {
  const algoId: string = (req.query.algoId as string) || ALGO_REGISTRY[0].id();

  const algo = getAlgoById(algoId);
  if (!algo) throw new Error(`Invalid algo name ${algoId}`);
  return algo;
};

export const getIndicatorFromRequest = (req: Request) => {
  return parseInt((req.query.indicator as string) || '0');
};

export const getDateTimeInEST = (datetime: string, format: string) => {
  return moment(datetime, format).tz('America/Toronto');
};

export const getMomentInEST = (moment: Moment) => {
  return moment.tz('America/Toronto');
};

// old = indicator value (original range of x)
// new = tradeAmount (new range of x)
// normalizes a number from old range to a new range (for ex - from indicator value range to trade amount range)
export const normalize = (
  x: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
) => {
  let weightedX =
    newMin + ((x - oldMin) * (newMax - newMin)) / (oldMax - oldMin);
  return Math.floor(weightedX);
};
