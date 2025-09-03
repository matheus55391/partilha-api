import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { randomUUID } from 'crypto';

@Injectable()
export class MailService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private mailerService: MailerService,
  ) {}

  async sendToken(id: string, email: string) {
    const token = randomUUID();
    await this.cacheManager.set(`pwd-reset:${token}`, id, 600000);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      text: `Use this token to reset your password: ${token}`,
    });
  }
}
