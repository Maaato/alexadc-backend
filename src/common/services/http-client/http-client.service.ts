import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { IHttpParams } from 'src/common/interfaces/http.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpClientService {
    private _headers = {}
    constructor(private readonly _http: HttpService) { }

    private httpCall({ method, url, data, customHeaders }: IHttpParams): Observable<AxiosResponse<any>> {
        let config: AxiosRequestConfig = {
            headers: customHeaders ? customHeaders : this._headers,
        }
        if (method === 'get' || method === 'delete') return this._http[method]<any>(url, config);
        return this._http[method]<any>(url, data, config).pipe(map(response => response.data));
    }

    public get(url: string, customHeaders?: AxiosRequestHeaders): Observable<AxiosResponse<any>> {
        return this.httpCall({ method: 'get', url, data: false, customHeaders });
    }

    public post(url: string, data: any, customHeaders?: AxiosRequestHeaders): Observable<AxiosResponse<any>> {
        return this.httpCall({ method: 'post', url, data, customHeaders });
    }
}
