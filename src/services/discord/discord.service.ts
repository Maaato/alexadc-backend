import { AxiosResponse, AxiosRequestHeaders } from 'axios'
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { HttpClientService } from 'src/services/http-client/http-client.service';

@Injectable()
export class DiscordService {

    private _API_ENDPOINT = "https://discord.com/api/v9";
    private _headers: AxiosRequestHeaders = {}

    constructor(private readonly _httpService: HttpClientService) {
        this._headers["Authorization"] = process.env.DISCORD_LOGIN_TOKEN;
        this._headers['Content-Type'] = 'application/json';
    }

    async sendRequestSongMessage({channelId, content}): Promise<AxiosResponse> {
        const url = `${this._API_ENDPOINT}/channels/${channelId}/messages`;
        const data = { content: `${process.env.DISCORD_MUSIC_BOT_PREFIX}play ${content}` } //TODO: Get Discord Bot Prefix
        return lastValueFrom(this._httpService.post(url, data, this._headers));
    }
}
