import { HandlerInput, RequestHandler, getLocale, getSlotValue } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { DiscordService } from 'src/api/discord/discord.service';
import { AlexaSkillsService } from '../alexa-skills.service';

export class PlaySongOnDiscordHandler implements RequestHandler {

  constructor(
    private readonly _alexaSkillsService: AlexaSkillsService,
    private readonly _discordService: DiscordService,
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
    await this._discordService.sendRequestSongMessage(songRequest)

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .withShouldEndSession(false)
      .getResponse();
  }
}
