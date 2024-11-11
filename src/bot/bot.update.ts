import {
    Update,
    Ctx,
    Start,
    Help,
    On,
    Hears,
    Command,
} from 'nestjs-telegraf';
import { prisma } from 'src/prisma/prisma';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
    @Start()
    async onStart(@Ctx() ctx: Context) {
        await ctx.reply(`Welcome ${ctx.from.first_name}. Enter /subscribe command to subscribe to weather update`);
    }

    @Command('subscribe')
    async onSubscribeCommand(@Ctx() ctx: Context) {
        const userId = ctx.from.id.toString();
        const name = ctx.from.first_name;
        try {

            const isUserExists = await prisma.user.findFirst({
                where: {
                    id: userId
                }
            });
            if (isUserExists) {
                await ctx.reply('You have already subscribed.\n Enter "/echo {cityname}" command if already subscribed')
                return;
            }

            const newUser = await prisma.user.create({
                data: {
                    id: userId,
                    name
                }
            })
            await ctx.reply('User subscribed successfully, enter command /weather to get weather update')
        }
        catch (e) {
            await ctx.reply('User subscription failed')
            console.log(e);
        }
    }

    @Command('echo')
    async onWeatherCommand(@Ctx() ctx: Context) {
        const city = ctx.text.slice(6)
        
        if(!city || city===''){
            await ctx.reply('Invalid city name.\n Enter "/echo {cityname}" ');
            return;
        }

        const APIKEY = process.env.OPEN_WEATHER_API_KEY
        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
                            .then( res => res.json())
                            .catch( err => {
                                console.log(err)
                                ctx.reply(`Couldn't get data`)
                            })
        
        const weatherDescription = weatherData?.weather?.[0]?.description || ""
        const temperature = weatherData?.main?.temp || "";
        const reply = `weather is ${weatherDescription} and temperature is ${temperature} deg C` 
        await ctx.reply(reply)
       
    }
    @On('message')
    async OnMessage(@Ctx() ctx: Context) {
        await ctx.reply('Enter /subscribe command to subscribe to weather update,\n Enter "/echo {cityname}" command if already subscribed')
    }

    @Help()
    async help(@Ctx() ctx: Context) {
        await ctx.reply('Send me a sticker');
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