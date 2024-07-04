type EnvType = {
  ENV: string;
  COINBASE_API: string;
  COINBASE_WS: string;
  COINGECKO_API: string;
};

export const getEnv = (): EnvType => {
  return {
    ENV: 'PROD',
    COINBASE_API: 'https://api.coinbase.com/v2',
    COINBASE_WS: 'wss://ws-feed.pro.coinbase.com',
    COINGECKO_API: 'https://api.coingecko.com/api/v3',
  };
};
