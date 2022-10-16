import { HandlerInput, RequestHandler , getLocale } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export class LaunchRequestHandler implements RequestHandler {
  
    canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  }

  handle(handlerInput: HandlerInput): Response {
    
    const languageForSpeech = getLocale(handlerInput.requestEnvelope).split("-")[0];
    const speechLanguage = require(`../../../config/languages/${languageForSpeech}.json`)["LaunchRequest"];

    const speechText = speechLanguage.speechText.replace("{username}", "Maato");
    const repromptText = speechLanguage.repromptText.replace("{username}", "Maato");

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .withSimpleCard(speechText, speechLanguage.simpleCardText)
      .getResponse();
  }
}
