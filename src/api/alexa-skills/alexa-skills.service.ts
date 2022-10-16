import { Injectable } from '@nestjs/common';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { SkillBuilders } from 'ask-sdk-core';
import { LaunchRequestHandler, SessionEndedRequestHandler, CancelAndStopHandler, AlexaErrorHandler, PlaySongOnDiscordIntent } from './handlers';
import { DiscordService } from '../discord/discord.service';

@Injectable()
export class AlexaSkillsService {

  constructor(
    private readonly _discordService: DiscordService) { }

  async handleRequest(requestEnvelope: RequestEnvelope): Promise<ResponseEnvelope> {
    let responseEnvelope: ResponseEnvelope;
    console.log(`handling Alexa request: ${requestEnvelope.request.type}`, requestEnvelope);
    try {
      responseEnvelope = await new Promise<ResponseEnvelope>((resolve, reject) => {
        SkillBuilders.custom().withSkillId(process.env.ALEXA_SKILL_ID).addRequestHandlers(
          new LaunchRequestHandler(),
          new SessionEndedRequestHandler(),
          new CancelAndStopHandler(),
          new PlaySongOnDiscordIntent(this._discordService)
        ).addErrorHandlers(new AlexaErrorHandler())
          .lambda()(requestEnvelope, requestEnvelope.context, (err: Error, result: ResponseEnvelope) => {
            if (err) {
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
