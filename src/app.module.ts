import { Module } from '@nestjs/common';
import { AlexaSkillsModule } from './api/alexa-skills/alexa-skills.module';
import { AppController } from './app.controller';

@Module({
  imports: [AlexaSkillsModule],
  controllers: [AppController],
})
export class AppModule {}
