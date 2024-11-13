import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectBot} from 'nestjs-telegraf';
import { IBotDto } from 'src/interfaces/dto.interface';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class BotSettingsService {
  constructor(
    @InjectBot('weatherUpdate') private bot: Telegraf<Context<Update>>,
  ) {}
  async getBotDetails(res: Response) {
    const bot = this.bot;
    try {
      const name = (await bot.telegram.getMyName()).name;
      const description = (await bot.telegram.getMyDescription()).description;
      const about = (await bot.telegram.getMyShortDescription())
        .short_description;
      return res.status(200).json({
        data: {
          name,
          description,
          about,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: 'Error in get bot details',
        e,
      });
    }
  }
  editBot(botDto: IBotDto, res: Response) {
    const bot = this.bot;
    const { about, description, name } = botDto;
    try {
      bot.telegram.setMyName(name);
      bot.telegram.setMyDescription(description);
      bot.telegram.setMyShortDescription(about);
      return res.status(200).json({
        data: {},
        message: 'Bot updated',
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: 'Error in Edit bot',
        e,
      });
    }
  }
}
