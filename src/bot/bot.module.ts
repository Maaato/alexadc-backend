import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { MongooseModule } from '@nestjs/mongoose';
import { BotGateway } from './bot.gateway';
import { MemberSchema } from 'src/database/schemas/member.schema';
import { BotService } from './bot.service';

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
        MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
    ],
    providers: [BotGateway, BotService]
})
export class BotModule { }