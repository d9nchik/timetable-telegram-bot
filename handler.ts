import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import bot from './src/bot';

export async function webhook(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  if (event.body) {
    let body =
      event.body[0] === '{'
        ? JSON.parse(event.body)
        : JSON.parse(String(Buffer.from(event.body, 'base64')));

    console.log('Request: ' + JSON.stringify(body));
    await bot.handleUpdate(body);
  }
  return { statusCode: 200, body: '' };
}
