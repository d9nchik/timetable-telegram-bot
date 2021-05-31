import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Telegraf } from 'telegraf';

const BOT_TOKEN = process.env.BOT_TOKEN || 'something gone wrong';
console.log(BOT_TOKEN);


export async function webhook(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  if (event.body) {
    let body =
      event.body[0] === '{'
        ? JSON.parse(event.body)
        : JSON.parse(String(Buffer.from(event.body, 'base64')));
    const bot = new Telegraf(BOT_TOKEN);

    bot.hears('hi', ctx => ctx.reply('Hello from bot'));

    console.log('Request: ' + JSON.stringify(body));
    await bot.handleUpdate(body);
  }
  return { statusCode: 200, body: '' };
}
