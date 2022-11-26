import { Injectable, Logger } from '@nestjs/common';
import { InjectDiscordClient, Once, On } from '@discord-nestjs/core';
import { Client, VoiceState } from 'discord.js';

@Injectable()
export class BotGateway {
    private readonly logger = new Logger(BotGateway.name);

    constructor(
        @InjectDiscordClient() private readonly client: Client,
    ) { }

    @Once('ready')
    onReady() {
        this.logger.log(`Bot ${this.client.user.tag} was started!`);
    }

    @On('voiceStateUpdate')
    async onVoiceStateUpdate(lastState: VoiceState, newState: VoiceState): Promise<void> {
        if (lastState.channelId === newState.channelId) return;
    }

}