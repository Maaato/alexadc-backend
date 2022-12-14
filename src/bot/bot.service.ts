import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MemberDocument } from 'src/database/schemas/member.schema';
import { IMemberVoiceState } from '../interfaces/memberVoiceState.interface';

@Injectable()
export class BotService {
    private readonly logger = new Logger(BotService.name);

    constructor(
        @InjectModel('Member') private readonly memberModel: Model<MemberDocument>
    ) { }

    async updateMemberVoiceState({ memberVoiceState }: { memberVoiceState: IMemberVoiceState }): Promise<MemberDocument> {
        const { userId, username, discriminator, guildId, guildName, currentChannelId } = memberVoiceState;
        this.logger.log(`Updating member voice state ${username}`)
        return this.memberModel.findOneAndUpdate({ userId },
            { $set: { userId, username, discriminator, guildId, guildName, currentChannelId } },
            { upsert: true, new: true }
        );
    }

    async getMemberVoiceState({ userId }: { userId: string }): Promise<MemberDocument> {
        this.logger.log(`Finding member by id ${userId}`)
        return this.memberModel.findOne({ userId });
    }
}
