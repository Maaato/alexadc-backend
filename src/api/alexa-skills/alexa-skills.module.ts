import { Module } from '@nestjs/common';
import { AlexaSkillsService } from './alexa-skills.service';
import { AlexaSkillsController } from './alexa-skills.controller';

@Module({
  controllers: [AlexaSkillsController],
  providers: [AlexaSkillsService],
})
export class AlexaSkillsModule {}
