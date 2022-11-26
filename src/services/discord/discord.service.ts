import { AxiosResponse, AxiosRequestHeaders } from 'axios'
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { HttpClientService } from 'src/services/http-client/http-client.service';

@Injectable()
export class DiscordService {

    private _API_ENDPOINT = "https://discord.com/api/v9";
    private _headers: AxiosRequestHeaders = {}

    constructor(private readonly _httpService: HttpClientService) {
        this._headers["Authorization"] = process.env.DISCORD_TOKEN;
        this._headers['Content-Type'] = 'application/json';
    }

    async sendRequestSongMessage(content): Promise<AxiosResponse> {
        let url = `${this._API_ENDPOINT}/channels/${process.env.DISCORD_MUSIC_CHANNEL_ID}/messages`; //TODO: Get Discord Channel ID
        let data = { content: `${process.env.DISCORD_BOT_PREFIX}play ${content}` } //TODO: Get Discord Bot Prefix
        return lastValueFrom(this._httpService.post(url, data, this._headers));
    }
}
