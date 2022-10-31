import { Module } from '@nestjs/common';
import { AlexaSkillsService } from './alexa-skills.service';
import { AlexaSkillsController } from './alexa-skills.controller';
import { DiscordModule } from '../discord/discord.module';

@Module({
  imports: [DiscordModule],
  controllers: [AlexaSkillsController],
  providers: [AlexaSkillsService],
})
export class AlexaSkillsModule { }
