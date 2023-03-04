import {Telegram} from "./telegram"

export interface Env {
	TELEGRAM_BOT_TOKEN: string
}

export default {
	async fetch(
		request: Request,
		env: Env,
	): Promise<Response> {
		if (!request.url.endsWith(env.TELEGRAM_BOT_TOKEN)) {
			return new Response(null, {
				status: 401,
			})
		}

		const update: Telegram.Update = await request.json()

		// grab chat ID from update
		const chatID = update.message?.chat.id || update.my_chat_member?.chat.id
		if (chatID === undefined) {
			return new Response(null, {
				status: 400,
			})
		}

		// reply ID in Telegram
		return Telegram.generateSendMessageResponse(chatID, "`"+chatID+"`")
	},
}
