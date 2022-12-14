import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { BotService } from './bot.service';
import { IMemberVoiceState } from '../interfaces/memberVoiceState.interface';

describe('Bot Test suite', () => {
    let service: BotService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BotService, {
                provide: getModelToken('Member'),
                useValue: {
                    findOneAndUpdate: jest.fn(),
                    findOne: jest.fn(),
                },
            }],
        }).compile();

        service = module.get<BotService>(BotService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call getMemberVoiceState', async () => {
        const req = { userId: '480873576354938891' };
        const botServiceSpy = jest.spyOn(service, 'getMemberVoiceState')
        await service.getMemberVoiceState(req)
        expect(botServiceSpy).toHaveBeenCalled();
        expect(botServiceSpy).toHaveBeenCalledWith(req)
    });

    it('should call updateMemberVoiceState', async () => {
        const req: IMemberVoiceState = {
            userId: '480873576354938891',
            username: 'マティト',
            discriminator: '2376',
            guildId: '464983808102629396',
            guildName: 'Ameisin',
            currentChannelId: '571562807187996685'
        };
        const botServiceSpy = jest.spyOn(service, 'updateMemberVoiceState')
        await service.updateMemberVoiceState({ memberVoiceState: req });
        expect(botServiceSpy).toHaveBeenCalled();
        expect(botServiceSpy).toHaveBeenCalledWith({ memberVoiceState: req })
    });

});