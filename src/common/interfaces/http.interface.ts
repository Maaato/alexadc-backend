import { AxiosRequestHeaders } from 'axios';

export interface IHttpParams {
  method: 'delete' | 'get' | 'put' | 'post';
  url: string;
  data?: any;
  customHeaders?: AxiosRequestHeaders;
}
