import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VoiceState } from 'discord.js';
import mongoose, { Model } from 'mongoose';

import { MemberDocument } from 'src/database/schemas/member.schema';
import { MemberVoiceState } from './models/memberVoiceState.dto';

@Injectable()
export class BotService {
    private readonly logger = new Logger(BotService.name);

    constructor(
        @InjectModel('Member') private readonly memberModel: Model<MemberDocument>
    ) { }

    async updateMemberVoiceState({ memberVoiceState }: { memberVoiceState: MemberVoiceState }): Promise<MemberDocument> {
        const { userId, username, discriminator, guildId, guildName, currentChannelId } = memberVoiceState;
        this.logger.log(`Updating member voice state ${ username }`)
        return await this.memberModel.findOneAndUpdate({ userId },
            { $set: { userId, username, discriminator, guildId, guildName, currentChannelId } },
            { upsert: true, new: true }
        );
    }
}