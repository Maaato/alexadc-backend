import { Module } from '@nestjs/common';
import { AlexaSkillsService } from './alexa-skills.service';
import { AlexaSkillsController } from './alexa-skills.controller';
import { DiscordModule } from '../../services/discord/discord.module';
import { BotModule } from '../../bot/bot.module';

@Module({
  imports: [DiscordModule, BotModule],
  controllers: [AlexaSkillsController],
  providers: [AlexaSkillsService],
})
export class AlexaSkillsModule { }
