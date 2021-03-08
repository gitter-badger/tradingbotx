# tradingbot

Trading Bot Web Console & APIs. (http://www.buythedipclub.com)

# Roadmap
- [x] Rewrite the project in typescript
- [x] OAuth Support (https://alpaca.markets/docs/build-apps_services-with-alpaca/oauth-guide/)
- [x] Trade with watchlists
- [x] Watchlist
- [x] SSL
- [x] Transaction Type in the Trade Table
- [x] Premium API support
- [x] Skip orders that are not tradable fractionally
- [x] Responsive Trade table for mobile
- [x] Fix list selector styling on the trading page
- [x] Support for live account (https://alpaca.markets/docs/api-documentation/api-v2/#paper-trading)
- [x] Error handling layer for both sync & async
- [x] Timezone fix (changed to EST)
- [x] Intraday price support for stocks (confidence is now realtime)
- [ ] Strong Validations (https://wanago.io/2018/12/17/typescript-express-error-handling-validation/)
- [ ] Live money trading approval by Alpaca
- [ ] Delete watchlist support
- [ ] Watchlist detail page
- [ ] Trade link on watchlist page
- [ ] Account's page
- [ ] Account's positions page
- [ ] List Order page
- [ ] Cancel Order
- [ ] Update Order


# Contribution

After you checkout the repo in your local box:

```
npm install
npx run compile
```

To start the website, you'll need Alpha Vantage API key:

```
export AV_API_KEY=... # Get your free api key from AlphaVantage website
export PORT=... # If you want to spin the website to a custom port

npm start
```

Alternatively, you can also create a `.env` file in the package root:

```sh
# AlphaVantage
AV_API_KEY=H0BGI27G6UTMXEZ9
# Server Port
PORT=3000
```

and then, simply:

```
npm start
```

After you make changes, feel free to submit a pull request.