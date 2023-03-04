export namespace Telegram {
    export interface Update {
        message?: Action
    }
    export interface Action {
        chat: Chat
    }
    export interface Chat {
        id: number
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

