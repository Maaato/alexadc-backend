import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { BotGateway } from './bot.gateway';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DiscordModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                token: configService.get('DISCORD_BOT_TOKEN'),
                discordClientOptions: {
                    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates],
                }
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [BotGateway]
})
export class BotModule { }