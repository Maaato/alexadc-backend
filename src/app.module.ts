import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AlexaSkillsModule } from './api/alexa-skills/alexa-skills.module';
import { DiscordModule } from './services/discord/discord.module';
import { HttpClientModule } from './services/http-client/services.module';
import { BotModule } from './bot/bot.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpClientModule,
    AlexaSkillsModule,
    DiscordModule,
    BotModule,
    DatabaseModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
