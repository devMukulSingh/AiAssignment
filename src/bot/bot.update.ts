import {
    Update,
    Ctx,
    Start,
    On,
    Hears,
    Command,
} from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
    constructor(private botService: BotService) { }
    @Start()
    async onStart(@Ctx() ctx: Context) {
        await ctx.reply(`Welcome ${ctx.from.first_name}. Enter /subscribe command to subscribe to weather update`);
    }
    @Command('subscribe')
    onSubscribeCommand(@Ctx() ctx: Context) {
        this.botService.onSubscribeCommand(ctx)
    }
    @Command('echo')
    onWeatherCommand(@Ctx() ctx: Context) {
        return this.botService.onWeatherCommand(ctx)
    }
    @On('message')
    async OnMessage(@Ctx() ctx: Context) {
        return this.botService.OnMessage(ctx)
    }
    @On('sticker')
    async on(@Ctx() ctx: Context) {
        await ctx.reply('👍');
    }
    @Hears('hi')
    async hears(@Ctx() ctx: Context) {
        await ctx.reply('Hey there');
    }
}