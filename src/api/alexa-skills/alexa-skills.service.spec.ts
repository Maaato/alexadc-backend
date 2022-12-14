import { Test } from '@nestjs/testing';
import { RequestEnvelope } from 'ask-sdk-model';
import { AxiosResponse } from 'axios'

import { AlexaSkillsService } from './alexa-skills.service';
import { DiscordService } from '../../services/discord/discord.service';
import { BotService } from '../../bot/bot.service';
import { MemberDocument } from 'src/database/schemas/member.schema';

describe(' Test suite', () => {
    let service: AlexaSkillsService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AlexaSkillsService,
                { provide: DiscordService, useValue: { sendRequestSongMessage: jest.fn() } },
                { provide: BotService, useValue: { getMemberVoiceState: jest.fn() } },
            ],
        }).compile();

        service = module.get<AlexaSkillsService>(AlexaSkillsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('handleRequest', () => {

        it('should call and handle LaunchRequestHandler', async () => {
            const expected = {
                outputSpeech: {
                    type: 'SSML', ssml: '<speak>Bienvenido マティト a Alexa Discord Skill!</speak>'
                },
                reprompt: {
                    outputSpeech: { type: 'SSML', ssml: '<speak>マティト, puedes preguntarme lo que sea.</speak>' }
                },
                shouldEndSession: false
            };
            const skillServiceSpy = jest.spyOn(service, 'handleRequest')
            const botServiceSpy = jest.spyOn(service['_botService'], 'getMemberVoiceState').mockImplementation(async () => Promise.resolve({ username: 'マティト' }) as Promise<MemberDocument>);
            const output = await service.handleRequest({ request: { type: 'LaunchRequest', locale: 'es-US' } } as RequestEnvelope);
            expect(skillServiceSpy).toHaveBeenCalled();
            expect(botServiceSpy).toHaveBeenCalled();
            expect(output.response).toEqual(expected);
        });

        it('should call and handle PlaySongOnDiscordHandler', async () => {
            const expected = {
                outputSpeech: { type: 'SSML', ssml: '<speak>Reproduciendo {value} en discord!</speak>' },
                shouldEndSession: true
            };
            const skillServiceSpy = jest.spyOn(service, 'handleRequest');
            const botServiceSpy = jest.spyOn(service['_botService'], 'getMemberVoiceState').mockImplementation(async () => Promise.resolve({ userId: '480873576354938891' }) as Promise<MemberDocument>);
            const discordServiceSpy = jest.spyOn(service['_discordService'], 'sendRequestSongMessage').mockImplementation(async () => Promise.resolve({} as Promise<AxiosResponse>));
            const output = await service.handleRequest({ request: { type: 'IntentRequest', locale: 'es-US', intent: { name: 'PlaySongOnDiscordIntent' } } } as RequestEnvelope);
            expect(skillServiceSpy).toHaveBeenCalled();
            expect(botServiceSpy).toHaveBeenCalled();
            expect(discordServiceSpy).toHaveBeenCalled();
            expect(output.response).toEqual(expected);

        });

        it('should handle ErrorHandler', async () => {
            const expected = {
                outputSpeech: { type: 'SSML', ssml: '<speak>Lo siento, no pude reproducir {value}</speak>' },
                shouldEndSession: true
            };
            const skillServiceSpy = jest.spyOn(service, 'handleRequest')
            const botServiceSpy = jest.spyOn(service['_botService'], 'getMemberVoiceState').mockImplementation(async () => Promise.reject({}));
            const output = await service.handleRequest({ request: { type: 'IntentRequest', locale: 'es-US', intent: { name: 'PlaySongOnDiscordIntent' } } } as RequestEnvelope);
            expect(skillServiceSpy).toHaveBeenCalled();
            expect(botServiceSpy).toHaveBeenCalled();
            expect(output.response).toEqual(expected);
        });

    });


});