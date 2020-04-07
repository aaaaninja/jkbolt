import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { App, ExpressReceiver } from '@slack/bolt'
import { createServer, proxy } from 'aws-serverless-express'
import 'source-map-support/register';

const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET
})
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver
})

export const boltapp = (event: APIGatewayProxyEvent, _context: Context) => proxy(createServer(receiver.app), event, _context)