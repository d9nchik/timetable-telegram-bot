import { Telegraf } from 'telegraf';
import weekTimeTable from './data.json';

const BOT_TOKEN = process.env.BOT_TOKEN || 'something gone wrong';
console.log(BOT_TOKEN);

const bot = new Telegraf(BOT_TOKEN);
bot.hears('hi', ctx => ctx.reply('Hello from bot'));

bot.command('timetable', ctx =>
  ctx.replyWithMarkdown(`_1 пара  08-30 - 10-05
2 пара  10-25 - 12-00
3 пара  12-20 - 13-55
4 пара  14-15 - 15-50
5 пара  16-10 - 17-45
6 пара  18-30 - 20-05_`)
);

bot.command('today', ctx => {
  const date = new Date();
  const weekNumber = getWeekNumber(date) % 2;
  const day = date.getDay();
  ctx.replyWithMarkdown(getMarkDownStringForDay(day, weekNumber));
});

bot.command('tomorrow', ctx => {
  const date = new Date();
  const weekNumber = getWeekNumber(date) % 2;
  const day = (date.getDay() + 1) % 7;
  ctx.replyWithMarkdown(getMarkDownStringForDay(day, weekNumber));
});

bot.command('week', ctx => {
  const date = new Date();
  const weekNumber = getWeekNumber(date) % 2;
  ctx.replyWithMarkdown(getMarkDownStringForWeek(weekNumber));
});

bot.command('nextweek', ctx => {
  const date = new Date();
  const weekNumber = (getWeekNumber(date) + 1) % 2;
  ctx.replyWithMarkdown(getMarkDownStringForWeek(weekNumber));
});

function getMarkDownStringForWeek(weekNumber: number): string {
  let totalString = '';
  for (let day = 0; day < 6; day++) {
    const stringForDay = getMarkDownStringForDay(day, weekNumber);
    if (stringForDay === 'Немає пар') continue;
    totalString = `${totalString}\n\n${stringForDay}`;
  }
  return totalString;
}

function getMarkDownStringForDay(day: number, weekNumber: number): string {
  const currentWeek = weekTimeTable[weekNumber];
  if (
    day === 0 ||
    day >= currentWeek[0].length ||
    currentWeek.every(item => item[day].length > 0)
  ) {
    return 'Немає пар';
  }
  let totalString = `*${currentWeek[0][day][0]}*`;
  for (let i = 1; i < currentWeek.length; i++) {
    const element = currentWeek[i][day];
    if (element.length === 0) continue;
    totalString = `${totalString}\n${i}) ${element.join(' ')}`;
  }
  return totalString;
}

function getWeekNumber(d: Date): number {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  // Return array of year and week number
  return Math.ceil(((Number(d) - Number(yearStart)) / 86400000 + 1) / 7);
}

export default bot;
