import { HandlerInput, RequestHandler, getLocale } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { BotService } from 'src/bot/bot.service';

import { AlexaSkillsService } from '../alexa-skills.service';

export class LaunchRequestHandler implements RequestHandler {

  constructor(
    private readonly _alexaSkillsService: AlexaSkillsService,
    private readonly _botService: BotService,
  ) { }

  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const localeRequest = getLocale(handlerInput.requestEnvelope).split("-")[0];
    const { username } = await this._botService.getMemberVoiceState({ userId: process.env.DISCORD_BOT_OWNER_USER_ID });
    const { success: { outputSpeech, repromptSpeech } } = this._alexaSkillsService.buildResponseMessage(LaunchRequestHandler.name, localeRequest, username);

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .reprompt(repromptSpeech)
      .getResponse();
  }
}
