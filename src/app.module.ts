import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AdminModule,
    TelegrafModule.forRootAsync({
      botName: 'weatherUpdate',
      useFactory: async (configService: ConfigService) => ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
      }),
      inject: [ConfigService],
    }),
    BotModule,

  ],
})
export class AppModule {

}
