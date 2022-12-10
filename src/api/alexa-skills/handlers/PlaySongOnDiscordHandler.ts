import { HandlerInput, RequestHandler, getLocale, getSlotValue } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { BotService } from 'src/bot/bot.service';

import { DiscordService } from 'src/services/discord/discord.service';
import { AlexaSkillsService } from '../alexa-skills.service';

export class PlaySongOnDiscordHandler implements RequestHandler {

  constructor(
    private readonly _alexaSkillsService: AlexaSkillsService,
    private readonly _discordService: DiscordService,
    private readonly _botService: BotService,
  ) { }

  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'PlaySongOnDiscordIntent'
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const localeRequest = getLocale(handlerInput.requestEnvelope).split("-")[0];
    const songRequest = getSlotValue(handlerInput.requestEnvelope, "song");
    const { success: { outputSpeech } } = this._alexaSkillsService.getHandlerResponseBuilderMessage(PlaySongOnDiscordHandler.name, localeRequest, songRequest);
    const { currentChannelId } = await this._botService.getMemberVoiceState({ userId: process.env.DISCORD_BOT_OWNER_USER_ID });
    await this._discordService.sendRequestSongMessage({ channelId: currentChannelId, content: songRequest })

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .withShouldEndSession(false)
      .getResponse();
  }
}
