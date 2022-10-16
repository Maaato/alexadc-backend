import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DiscordService } from './discord.service';

@Module({
  imports: [CommonModule],
  providers: [DiscordService],
  exports: [DiscordService]
})
export class DiscordModule { }
