import { Module } from '@nestjs/common';
import { HttpClientModule } from 'src/services/http-client/services.module';
import { DiscordService } from './discord.service';

@Module({
  imports: [HttpClientModule],
  providers: [DiscordService],
  exports: [DiscordService]
})
export class DiscordModule { }
