import { Injectable, Logger } from '@nestjs/common';
import { RequestEnvelope, ResponseEnvelope, } from 'ask-sdk-model';
import { SkillBuilders, getIntentName, getRequestType } from 'ask-sdk-core';

import { LaunchRequestHandler, SessionEndedRequestHandler, CancelAndStopHandler, AlexaErrorHandler, PlaySongOnDiscordHandler } from './handlers';
import { DiscordService } from '../../services/discord/discord.service';
import { RESPONSE_BUILDER_MESSAGES } from '../../constants/handlers-messages.constants';
import Constants from '../../constants/alexa.constants'
import { BotService } from '../../bot/bot.service';


@Injectable()
export class AlexaSkillsService {

  private readonly logger = new Logger(AlexaSkillsService.name)

  constructor(
    private readonly _discordService: DiscordService,
    private readonly _botService: BotService) { }

  async handleRequest(requestEnvelope: RequestEnvelope): Promise<ResponseEnvelope> {
    let responseEnvelope: ResponseEnvelope;
    const requestType = getRequestType(requestEnvelope);
    const intentName = requestType === 'IntentRequest' ? getIntentName(requestEnvelope) : '';
    this.logger.log(`Handling ${requestType} ${intentName}`);
    try {
      responseEnvelope = await new Promise<ResponseEnvelope>((resolve, reject) => {
        SkillBuilders.custom().withSkillId(process.env.ALEXA_SKILL_ID).addRequestHandlers(
          new LaunchRequestHandler(this, this._botService),
          new SessionEndedRequestHandler(),
          new CancelAndStopHandler(this),
          new PlaySongOnDiscordHandler(this, this._discordService, this._botService)
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

  //TODO: Refactor this method
  public buildResponseMessage(handlerName: string, locale: string, replacementValue?: string) {
    let { success, error = null } = RESPONSE_BUILDER_MESSAGES[locale][handlerName];
    if (success && replacementValue && success.outputSpeech.includes(Constants.PLACEHOLDER_VALUE)) {
      success.outputSpeech = success.outputSpeech.replace(Constants.PLACEHOLDER_VALUE, replacementValue);
    }
    if (success && replacementValue && success.repromptSpeech?.includes(Constants.PLACEHOLDER_VALUE)) {
      success.repromptSpeech = success.repromptSpeech.replace(Constants.PLACEHOLDER_VALUE, replacementValue);
    }
    if (error && replacementValue && error.outputSpeech.includes(Constants.PLACEHOLDER_VALUE)) {
      error.outputSpeech = error.outputSpeech.replace(Constants.PLACEHOLDER_VALUE, replacementValue);
    }
    return { success, error };
  }

}
