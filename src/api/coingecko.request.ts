import {axios} from '../modules';
import {getEnv} from '../utils';

const {COINGECKO_API} = getEnv();

const baseURL = COINGECKO_API;
const timeout = 30000; //30 seconds

const coingeckoRequest = axios.create({
  baseURL,
  timeout,
});

axios.defaults.timeout = timeout;

export {coingeckoRequest};
