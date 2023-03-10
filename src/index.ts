import {Telegram} from "./telegram"

export interface Env {
	TELEGRAM_BOT_TOKEN: string
}

export default {
	async fetch(
		request: Request,
		env: Env,
	): Promise<Response> {
		if (request.cf?.asOrganization !== "Telegram Messenger Inc" || !request.url.endsWith(env.TELEGRAM_BOT_TOKEN)) {
			return new Response(null, {
				status: 401,
			})
		}

		const update: Telegram.Update = await request.json()

		// grab chat ID from update
		const chatID = update.message?.chat?.id || update.inline_query?.from.id
		if (chatID === undefined) {
			return new Response(null, {
				status: 400,
			})
		}

		// for inline_query, just respond with an inline query answer
		const response = "`" + chatID + "`"
		if (update.inline_query) {
			return Telegram.generateAnswerInlineQueryResponse(update.inline_query?.id, chatID, response)
		} else {
			return Telegram.generateSendMessageResponse(chatID, response)
		}
	},
}
