import {ResponseError} from '../utils/entities';

import {coinbaseRequest} from './coinbase.request';
import {coingeckoRequest} from './coingecko.request';

export const getCurrencies = async (): Promise<TCurrency[]> => {
  try {
    const response = await coinbaseRequest.get('/exchange-rates');

    const rates = response.data.data.rates;

    const currencies = Object.keys(rates).map(currency => ({
      currency,
      value: parseFloat(rates[currency]),
    }));

    // Fetch coin details from CoinGecko.
    // Coinbase doesn't provide coin images.
    const coinGeckoResponse = await coingeckoRequest.get(
      'coins/markets?vs_currency=usd',
    );
    const coinGeckoData = coinGeckoResponse.data;

    // Merge data from API responses.
    const mergedData: TCurrency[] = currencies.map(currency => {
      const coin = coinGeckoData.find(
        (item: TCryptoGenko) => item.symbol.toUpperCase() === currency.currency,
      );
      return {
        ...currency,
        image: coin ? coin.image : null,
      };
    });

    return mergedData;
  } catch (error) {
    throw new ResponseError(error);
  }
};
