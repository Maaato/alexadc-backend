import { HandlerInput, RequestHandler, getLocale } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { AlexaSkillsService } from '../alexa-skills.service';

export class LaunchRequestHandler implements RequestHandler {

  constructor(
    private readonly _alexaSkillsService: AlexaSkillsService,
  ) { }

  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  }

  handle(handlerInput: HandlerInput): Response {
    const localeRequest = getLocale(handlerInput.requestEnvelope).split("-")[0];
    // TODO: Get Discord Username
    const { success: { outputSpeech, repromptSpeech } } = this._alexaSkillsService.getHandlerResponseBuilderMessage(LaunchRequestHandler.name, localeRequest, "Maaato");

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .reprompt(repromptSpeech)
      .getResponse();
  }
}
