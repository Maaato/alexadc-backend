import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export class SessionEndedRequestHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  }

  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder.getResponse();
  }
}
