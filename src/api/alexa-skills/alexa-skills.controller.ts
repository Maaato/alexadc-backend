import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { AlexaSkillsService } from './alexa-skills.service';

@Controller()
export class AlexaSkillsController {
  constructor(private readonly _alexaSkillService: AlexaSkillsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleAlexaRequest(@Body() requestEnvelope: RequestEnvelope): Promise<ResponseEnvelope> {
    return this._alexaSkillService.handleRequest(requestEnvelope);
  }
}
