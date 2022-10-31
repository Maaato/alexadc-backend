import { HandlerInput, RequestHandler, getLocale } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { AlexaSkillsService } from '../alexa-skills.service';

export class CancelAndStopHandler implements RequestHandler {

  constructor(
    private readonly _alexaSkillsService: AlexaSkillsService,
  ) { }

  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent')
    );
  }

  handle(handlerInput: HandlerInput): Response {
    const localeRequest = getLocale(handlerInput.requestEnvelope).split("-")[0];
    const { success: { outputSpeech } } = this._alexaSkillsService.getHandlerResponseBuilderMessage(CancelAndStopHandler.name, localeRequest);

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .withShouldEndSession(true)
      .getResponse();
  }
}
