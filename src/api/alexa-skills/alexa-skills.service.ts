import { Injectable } from '@nestjs/common';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { SkillBuilders } from 'ask-sdk-core';
import { LaunchRequestHandler, SessionEndedRequestHandler } from './handlers';

@Injectable()
export class AlexaSkillsService {

  async handleRequest(requestEnvelope: RequestEnvelope): Promise<ResponseEnvelope> {
    let responseEnvelope: ResponseEnvelope;
    console.log(`handling Alexa request: ${requestEnvelope.request.type}`, requestEnvelope);
    try {
      responseEnvelope = await new Promise<ResponseEnvelope>((resolve, reject) => {
          SkillBuilders.custom().withSkillId(process.env.ALEXA_SKILL_ID).addRequestHandlers(
            new LaunchRequestHandler(),
            new SessionEndedRequestHandler()
          ).lambda()(requestEnvelope, requestEnvelope.context, (err : Error , result: ResponseEnvelope) => {
            if(err){
              console.error(`Error handling Alexa request: ${err.message}`, err)
              reject(err.message)
            }
            resolve(result)
          })
        },
      );
    } catch (err) {
      console.error(`Error handling Alexa request: ${err.message}`, err)
    }
    return responseEnvelope;
  }
}
