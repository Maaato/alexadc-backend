import { Logger } from '@nestjs/common';
import { HandlerInput, getLocale, ErrorHandler, getIntentName } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { AlexaSkillsService } from '../alexa-skills.service';
import { getHandlerNameByIntentName } from '../../../utils/alexa.utils';


export class AlexaErrorHandler implements ErrorHandler {

  private readonly logger = new Logger(AlexaErrorHandler.name)

  constructor(
    private readonly _alexaSkillsService: AlexaSkillsService,
  ) { }

  canHandle(): boolean {
    return true;
  }

  handle(handlerInput: HandlerInput, error: Error): Response {
    const intentName = getIntentName(handlerInput.requestEnvelope);
    this.logger.warn(`Error handling '${intentName}' | ${error}`);
    const localeRequest = getLocale(handlerInput.requestEnvelope).split("-")[0];
    const handlerName = getHandlerNameByIntentName(intentName);
    const { error: { outputSpeech } } = this._alexaSkillsService.buildResponseMessage(handlerName, localeRequest);

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .withShouldEndSession(true)
      .getResponse();
  }
}
