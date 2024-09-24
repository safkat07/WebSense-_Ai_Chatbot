"use client"

import { useChat } from "ai/react"
import Messages from "./Messages"

export const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
    const { messages, handleInputChange, input, handleSubmit } = useChat({
        api: '/api/chat-stream',
        body: { sessionId }
    })
    return (
        <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700  justify-between gap-2">
            <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
                <Messages messages={messages} />
            </div>
            <form onSubmit={handleSubmit}>
                <input value={input} onChange={handleInputChange} className="text-black" type="text" />
                <input type="submit" value="send" />
            </form>
        </div>
    )
}
