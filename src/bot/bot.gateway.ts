import { Injectable, Logger } from '@nestjs/common';
import { InjectDiscordClient, Once, On } from '@discord-nestjs/core';
import { Client, VoiceState } from 'discord.js';
import { BotService } from './bot.service';
import { MemberDocument } from 'src/database/schemas/member.schema';
import { MemberVoiceState } from './models/memberVoiceState.dto'

@Injectable()
export class BotGateway {
    private readonly logger = new Logger(BotGateway.name);

    constructor(
        @InjectDiscordClient() private readonly client: Client,
        private readonly botService: BotService
    ) { }

    @Once('ready')
    onReady(): void {
        this.logger.log(`Bot ${this.client.user.tag} was started!`);
    }

    @On('voiceStateUpdate')
    async onVoiceStateUpdate(lastState: VoiceState, newState: VoiceState): Promise<MemberDocument> {
        this.logger.log(`Handling VoiceStateUpdate for ${newState.member.user.username}`);
        if (lastState.channelId === newState.channelId) return; // Ignore if the user is in the same channel
        if (newState.member.user.bot) return; // Ignore if the user is a bot
        const { channelId, guild, member } = newState;
        const memberVoiceState: MemberVoiceState = {
            userId: member.user.id,
            username: member.user.username,
            discriminator: member.user.discriminator,
            guildId: guild.id,
            guildName: guild.name,
            currentChannelId: channelId
        }
        return this.botService.updateMemberVoiceState({ memberVoiceState });
    }

}