import { HandlerInput, RequestHandler, getLocale } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export class CancelAndStopHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent')
    );
  }

  handle(handlerInput: HandlerInput): Response {

    const languageForSpeech = getLocale(handlerInput.requestEnvelope).split("-")[0];
    const { speechText, simpleCardTitle } = require(`../../../config/languages/${languageForSpeech}.json`)["CancelAndStopHandler"];

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(simpleCardTitle, speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
}
