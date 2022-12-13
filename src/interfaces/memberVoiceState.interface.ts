export interface IMemberVoiceState {
    readonly userId: string;
    readonly username: string;
    readonly discriminator: string;
    readonly guildId: string;
    readonly guildName: string;
    readonly currentChannelId: string;
}