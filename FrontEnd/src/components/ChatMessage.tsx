import React from 'react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white self-end'
            : 'bg-gray-200 text-black'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};
