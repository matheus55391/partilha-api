import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST') || 'localhost',
          port: config.get<number>('MAIL_PORT') || 1025,
          secure: false,
        },
        defaults: {
          from: '"Partilha App" <no-reply@partilha.com>',
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailerModule, MailService],
})
export class MailModule {}
