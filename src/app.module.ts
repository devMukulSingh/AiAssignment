import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { AdminModule } from './admin/admin.module';
import { BotSettingsModule } from './botSettings/botSettings.module';
import { ApiKeysModule } from './apikeys/apikeys.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    TelegrafModule.forRootAsync({
      botName: 'weatherUpdate',
      useFactory: async () => ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
        launchOptions: {
          webhook: {
            domain: `aiassignment.onrender.com`,
            path: '/secret-path',
          },
        },
      }),
      inject: [ConfigService],
    }),
    BotModule,
    BotSettingsModule,
    ApiKeysModule,
  ],
})
export class AppModule {}
