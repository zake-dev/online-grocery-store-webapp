import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [],
  exports: [MailService],
  providers: [MailService],
  controllers: [],
})
export class MailModule {}
