export namespace Telegram {
    export interface Update {
        message?: Action
        inline_query?: Action
    }
    export interface Action {
        id: string,
        from: Chat
        chat: Chat
        sticker?: Sticker
    }
    export interface Chat {
        id: number
    }
    export interface Sticker {
        file_id: string
    }

    export function generateAnswerInlineQueryResponse(inlineQueryID: string, chatID: number, text: string): Response {
        const chatIDString = chatID.toString()
        return new Response(JSON.stringify({
            "method": "answerInlineQuery",
            "inline_query_id": inlineQueryID,
            "results": [
                {
                    "type": "article",
                    "id": chatIDString,
                    "title": "Your own user ID is",
                    "input_message_content": {
                        "message_text": text,
                        "parse_mode": "Markdown",
                    },
                    "description": chatIDString,
                    "thumb_url": "https://gitlab.com/jarylc/cf-workers-icanhazid-telegram-bot/-/raw/master/cf-workers-icanhazid-telegram-bot.jpg"
                },
            ],
            "is_personal": true,
        }), {
            headers: {
                "content-type": "application/json",
            }
        })
    }

    export function generateSendMessageResponse(chatID: number, text: string): Response {
        return new Response(JSON.stringify({
            "method": "sendMessage",
            "chat_id": chatID,
            "parse_mode": "Markdown",
            "text": text,
        }), {
            headers: {
                "content-type": "application/json",
            }
        })
    }
}

