# cf-workers-icanhazid-telegram-bot
![Logo](cf-workers-icanhazid-telegram-bot.jpg)

## Description
![Example](example.png)

Inspired by https://icanhazip.com/ (which is also [hosted on Cloudflare Workers](https://major.io/2021/06/06/a-new-future-for-icanhazip/)), this bot simply replies the current chat's ID for info when started or invited to the chat.

You can talk to or invite the bot @ http://t.me/icanhazidbot.

## Deployment
### Workers
1. Clone this repository
2. Run `npm ci` or `yarn install`
3. Run `npx wrangler secret put TELEGRAM_BOT_TOKEN` and set the Telegram bot token
4. Run `npx wrangler publish` to deploy to Cloudflare Workers
5. Replace `{TELEGRAM_BOT_TOKEN}` and `{WORKERS_NAMESPACE}` on the following `https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/setWebhook?allowed_updates=%5B%22message%22%20%2C%22my_chat_member%22%5D&url=https%3A%2F%2Fcf-workers-icanhazid-telegram-bot.{WORKERS_NAMESPACE}.workers.dev%2F{TELEGRAM_BOT_TOKEN}` and access it on your browser

### Commands (for BotFather)
```
id - Get the bot to respond with the ID of the current chat
```
