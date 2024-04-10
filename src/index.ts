import {Telegram} from "./telegram"

export interface Env {
	TELEGRAM_BOT_TOKEN: string
}

export default {
	async fetch(
		request: Request,
		env: Env,
	): Promise<Response> {
		if (!request.cf?.asOrganization.toLowerCase().includes("telegram") || !request.url.endsWith(env.TELEGRAM_BOT_TOKEN)) {
			return new Response(null, {
				status: 401,
			})
		}

		const update: Telegram.Update = await request.json()

		// grab chat ID
		const chatID = update.message?.chat?.id || update.inline_query?.from.id
		if (chatID === undefined) {
			return new Response(null, {
				status: 400,
			})
		}

		// handle sticker
		const stickerID = update.message?.sticker?.file_id

		// sticker ID if it is a sticker, else return chatID
		const id = stickerID || chatID

		// for inline_query, just respond with an inline query answer
		const response = "`" + id + "`"
		if (update.inline_query) {
			return Telegram.generateAnswerInlineQueryResponse(update.inline_query?.id, chatID, response)
		} else {
			return Telegram.generateSendMessageResponse(chatID, response)
		}
	},
}
