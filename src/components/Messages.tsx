import { type Message as TMessage } from 'ai/react';
import Message from './Message';

interface MessageProps {
    messages: TMessage[];
}

const Messages = ({ messages }: MessageProps) => {
    return (
        <div className='flex max-h-[calc(100vh - 3.5rem - 7rem)] flex-1 flex-col overflow-y-auto'>
            {messages && messages.length > 0 ? (
                messages.map((message, i) => (
                    <Message key={i} content={message.content} isUserMessage={message.role === "user"} />
                ))
            ) : (
                <div>
                    no message
                </div>
            )}
        </div>
    );
}

export default Messages;
