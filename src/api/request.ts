import {axios} from '../modules';
import {getEnv} from '../utils';

const {COINBASE_API} = getEnv();

const baseURL = COINBASE_API;
const timeout = 30000; //30 seconds

const request = axios.create({
  baseURL,
  timeout,
});

axios.defaults.timeout = timeout;

export {request};
