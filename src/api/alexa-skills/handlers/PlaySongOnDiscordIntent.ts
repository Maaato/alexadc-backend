import { HandlerInput, RequestHandler, getLocale, getSlotValue } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { DiscordService } from 'src/api/discord/discord.service';

export class PlaySongOnDiscordIntent implements RequestHandler {

  constructor(private readonly _discordService: DiscordService) { }

  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'PlaySongOnDiscordIntent'
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    console.info("[IntentHandler][PlaySongOnDiscordIntent] -> Received from Alexa.");
    let speechText = "", simpleCardText = "", simpleCardTitle = "";

    const languageForSpeech = getLocale(handlerInput.requestEnvelope).split("-")[0];
    const speechLanguage = require(`../../../config/languages/${languageForSpeech}.json`)["PlaySongOnDiscordIntent"];

    const requestedSong = getSlotValue(handlerInput.requestEnvelope, "song");

    const result = await this._discordService.sendRequestSongMessage(requestedSong).catch(err => console.error(err.message));

    if (result) {
      speechText = speechLanguage.success.speechText.replace("{requestedSong}", requestedSong);
      simpleCardText = speechLanguage.success.simpleCardText.replace("{requestedSong}", requestedSong);
      simpleCardTitle = speechLanguage.success.simpleCardTitle;
    } else {
      speechText = speechLanguage.error.speechText.replace("{requestedSong}", requestedSong);
      simpleCardTitle = speechLanguage.error.simpleCardTitle;
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(simpleCardTitle, simpleCardText)
      .withShouldEndSession(true)
      .getResponse();
  }
}
