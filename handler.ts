import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { App, ExpressReceiver } from '@slack/bolt'
import { createServer, proxy } from 'aws-serverless-express'
import 'source-map-support/register';

const expressReceiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET
})
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver
})

export const boltapp = (event: APIGatewayProxyEvent, _context: Context) => proxy(createServer(expressReceiver.app), event, _context)