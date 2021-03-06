# tradingbot

Trading Bot Web Console & APIs. (http://www.buythedipclub.com)

# Roadmap
- [x] Rewrite the project in typescript
- [ ] Support for live account (https://alpaca.markets/docs/api-documentation/api-v2/#paper-trading)
- [ ] OAuth Support (https://alpaca.markets/docs/build-apps_services-with-alpaca/oauth-guide/)
- [ ] Watchlist
- [ ] Account's page
- [ ] Account's positions page
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