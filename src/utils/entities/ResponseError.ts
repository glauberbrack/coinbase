import {AxiosError} from '../../modules';

import {ERRORS} from '../enums';

export class ResponseError {
  status: string;
  message: string;
  error: string;

  constructor({response}: AxiosError | unknown | any) {
    this.status = response.data.statusCode;
    this.message = response.data.message || ERRORS.DEFAULT_MESSAGE;
    this.error = response.data.error;
  }
}
