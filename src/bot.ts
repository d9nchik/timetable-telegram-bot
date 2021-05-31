import { Telegraf } from 'telegraf';

const BOT_TOKEN = process.env.BOT_TOKEN || 'something gone wrong';
console.log(BOT_TOKEN);

const bot = new Telegraf(BOT_TOKEN);
bot.hears('hi', ctx => ctx.reply('Hello from bot'));

bot.command('timetable', ctx =>
  ctx.reply(`1 пара  08-30 - 10-05
2 пара  10-25 - 12-00
3 пара  12-20 - 13-55
4 пара  14-15 - 15-50
5 пара  16-10 - 17-45
6 пара  18-30 - 20-05`)
);

export default bot;
