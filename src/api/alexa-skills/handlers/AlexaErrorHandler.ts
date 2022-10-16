import { HandlerInput, getLocale, ErrorHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export class AlexaErrorHandler implements ErrorHandler {

  canHandle(): boolean {
    return true;
  }

  handle(handlerInput: HandlerInput): Response {

    const languageForSpeech = getLocale(handlerInput.requestEnvelope).split("-")[0];
    const { speechText } = require(`../../../config/languages/${languageForSpeech}.json`)["ErrorHandler"];

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
}
