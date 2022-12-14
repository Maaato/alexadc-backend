import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

@Schema({ versionKey: false, timestamps: true })
export class Member {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    discriminator: string;

    @Prop({ required: true })
    guildId: string;

    @Prop({ required: true })
    guildName: string;

    @Prop({ required: true })
    currentChannelId: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
