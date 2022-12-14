import { Test } from '@nestjs/testing';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { AlexaSkillsController } from './alexa-skills.controller';
import { AlexaSkillsService } from './alexa-skills.service';

describe('AlexaSkillsController', () => {
    let controller: AlexaSkillsController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AlexaSkillsController],
            providers: [{ provide: AlexaSkillsService, useValue: { handleRequest: jest.fn() } }],
        }).compile();

        controller = module.get<AlexaSkillsController>(AlexaSkillsController);

    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should calling handleAlexaReq', async () => {
        let expected: ResponseEnvelope = {
            version: "1.0",
            response: { outputSpeech: { type: "SSML", ssml: "<speak>Test</speak>" }, shouldEndSession: true }
        };
        jest.spyOn(controller['_alexaSkillService'], 'handleRequest').mockImplementation(() => Promise.resolve(expected));
        expect(await controller.handleAlexaRequest(<RequestEnvelope>{})).toBe(expected);
    });
});