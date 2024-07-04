import {request} from './request';
import {ResponseError} from '../utils/entities';
import axios from 'axios';

export const getCurrencies = async (): Promise<TCurrency[]> => {
  try {
    const response = await request.get('/exchange-rates');

    const rates = response.data.data.rates;

    const currencies = Object.keys(rates).map(currency => ({
      currency,
      value: parseFloat(rates[currency]),
    }));

    // Fetch coin details from CoinGecko.
    // Coinbase doesn't provide coin images.
    const coinGeckoResponse = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
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
