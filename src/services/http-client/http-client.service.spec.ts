import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { AxiosResponse } from 'axios'
import { lastValueFrom, of } from 'rxjs';
import { HttpClientService } from './http-client.service';

describe('HttpClient Test suite', () => {
    let service: HttpClientService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [HttpClientService, {
                provide: HttpService, useValue: {
                    get: () => of(), post: () => of(),
                }
            }],
        }).compile();

        service = module.get<HttpClientService>(HttpClientService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call get', async () => {
        const req = { method: 'get', url: 'https://google.com', data: false, customHeaders: {} };
        const httpSpy = jest.spyOn(service['_http'], 'get');
        service.get(req.url, req.customHeaders);
        expect(httpSpy).toBeCalledWith(req.url, { headers: req.customHeaders });
    });

    it('should call post', async () => {
        const req = { method: 'post', url: 'https://google.com', data: { name: 'test' }, customHeaders: {} };
        const httpSpy = jest.spyOn(service['_http'], 'post');
        service.post(req.url, req.data, req.customHeaders);
        expect(httpSpy).toBeCalledWith(req.url, req.data, { headers: req.customHeaders });
    });

    it('should handle return value', async () => {
        const req = { method: 'post', url: 'https://google.com', data: { name: 'test' } };
        const expected = { data: 'test' };
        const httpSpy = jest.spyOn(service['_http'], 'post').mockImplementation(() => of(expected as AxiosResponse));
        const result = await lastValueFrom(service.post(req.url, req.data));
        expect(httpSpy).toBeCalledWith(req.url, req.data, { headers: {} });
        expect(result).toEqual(expected.data);

    });

});