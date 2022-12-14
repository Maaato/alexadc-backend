import { AxiosRequestHeaders } from 'axios';

export interface IHttpParams {
  readonly method: 'delete' | 'get' | 'put' | 'post';
  readonly url: string;
  readonly data?: any;
  readonly customHeaders?: AxiosRequestHeaders;
}
