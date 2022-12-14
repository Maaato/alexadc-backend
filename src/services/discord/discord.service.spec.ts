import { Test } from '@nestjs/testing';
import { AxiosResponse } from 'axios'
import { of } from 'rxjs';
import { HttpClientService } from '../http-client/http-client.service';
import { DiscordService } from './discord.service';

describe('Discord Test suite', () => {
    let discordService: DiscordService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [DiscordService,
                { provide: HttpClientService, useValue: { post: () => of(), get: () => of() } },
            ],
        }).compile();

        discordService = module.get<DiscordService>(DiscordService);
    });

    it('should be defined', () => {
        expect(discordService).toBeDefined();
    });

    it('should call sendRequestSongMessage', async () => {
        const req = { channelId: '1036731984124325888', content: 'un ratito' };
        const discordSpy = jest.spyOn(discordService, 'sendRequestSongMessage').mockImplementation(() => Promise.resolve({} as Promise<AxiosResponse>));
        await discordService.sendRequestSongMessage(req);
        expect(discordSpy).toBeCalledWith(req);
    });

    it('should handle sendRequestSongMessage and call httpService', async () => {
        const req = { channelId: '1036731984124325888', content: 'un ratito' };
        const httpServiceSpy = jest.spyOn(discordService['_httpService'], 'post').mockImplementation(() => of({} as AxiosResponse));
        await discordService.sendRequestSongMessage(req);
        expect(httpServiceSpy).toHaveBeenCalled();

    });

});