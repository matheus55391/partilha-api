import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('CACHE_TTL') || 60,
        store: createKeyv(configService.get<string>('REDIS_URL') || 'redis://localhost:6379'),
      }),
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
