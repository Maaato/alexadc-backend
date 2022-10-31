import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlexaSkillsModule } from './api/alexa-skills/alexa-skills.module';
import { AppController } from './app.controller';
import { DiscordModule } from './api/discord/discord.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ConfigModule.forRoot(), AlexaSkillsModule, DiscordModule, CommonModule],
  controllers: [AppController],
})
export class AppModule { }
