import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class ApiKeysService {
  constructor(@InjectBot('weatherUpdate') private bot: Telegraf<Context>) {}
  async getApikeys(res: Response) {
    const token = this.bot.telegram.token;
    this.bot;
    return res.json({
      data: {
        token,
      },
      message: 'success',
    });
  }
}
