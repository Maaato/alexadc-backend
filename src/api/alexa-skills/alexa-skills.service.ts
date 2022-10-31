import { Injectable, Logger } from '@nestjs/common';
import { RequestEnvelope, ResponseEnvelope, } from 'ask-sdk-model';
import { SkillBuilders, getIntentName, getRequestType } from 'ask-sdk-core';

import { LaunchRequestHandler, SessionEndedRequestHandler, CancelAndStopHandler, AlexaErrorHandler, PlaySongOnDiscordHandler } from './handlers';
import { DiscordService } from '../discord/discord.service';
import { RESPONSE_BUILDER_MESSAGES } from '../../constants/handlers-messages.constants';
import Constants from '../../constants/alexa.constants'


@Injectable()
export class AlexaSkillsService {

  private readonly logger = new Logger(AlexaSkillsService.name)

  constructor(
    private readonly _discordService: DiscordService) { }

  async handleRequest(requestEnvelope: RequestEnvelope): Promise<ResponseEnvelope> {
    let responseEnvelope: ResponseEnvelope;
    const requestType = getRequestType(requestEnvelope);
    const intentName = requestType === 'IntentRequest' ? getIntentName(requestEnvelope) : '';
    this.logger.log(`handling ${requestType} ${intentName}`); // requestEnvelope
    try {
      responseEnvelope = await new Promise<ResponseEnvelope>((resolve, reject) => {
        SkillBuilders.custom().withSkillId(process.env.ALEXA_SKILL_ID).addRequestHandlers(
          new LaunchRequestHandler(this),
          new SessionEndedRequestHandler(),
          new CancelAndStopHandler(this),
          new PlaySongOnDiscordHandler(this, this._discordService)
        ).addErrorHandlers(new AlexaErrorHandler(this))
          .lambda()(requestEnvelope, requestEnvelope.context, (err: Error, result: ResponseEnvelope) => {
            if (err) {
              this.logger.error(`Error handling Alexa request: ${err.message}`, err)
              reject(err.message)
            }
            resolve(result)
          })
      },
      );
    } catch (err) {
      this.logger.error(`Error handling Alexa request: ${err.message}`, err)
    }
    return responseEnvelope;
  }

  public getHandlerResponseBuilderMessage(handlerName: string, locale: string, replacementValue?: string) {
    let { success, error } = RESPONSE_BUILDER_MESSAGES[locale][handlerName];
    if (replacementValue) {
      if (success && success.outputSpeech.includes(Constants.PLACEHOLDER_VALUE)) success.outputSpeech = success.outputSpeech.replace(Constants.PLACEHOLDER_VALUE, replacementValue);
      if (error && error.outputSpeech.includes(Constants.PLACEHOLDER_VALUE)) error.outputSpeech = error.outputSpeech.replace(Constants.PLACEHOLDER_VALUE, replacementValue);
    }
    return { success, error };
  }


}
