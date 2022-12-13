import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { Response } from 'express';

describe('AppController test suite', () => {
    let appController: AppController;
    let expected = { name: 'alexadc-backend', version: '1.0.0', status: 'up' };

    const res: Partial<Response> = {
        json: jest.fn().mockReturnValue(expected),
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AppController],
        }).compile();

        appController = module.get<AppController>(AppController);
    });

    describe('getRoot', () => {
        it('should return project info', async () => {
            expect(appController.getRoot(res as Response)).toEqual(expected);
        });
    });
});