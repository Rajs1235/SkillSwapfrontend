import React from 'react';

const ChatWindow = ({ messages }) => (
  <div className="flex-1 overflow-y-auto space-y-2 p-2">
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`p-2 rounded-lg max-w-xs ${msg.from === 'me' ? 'bg-blue-600 self-end ml-auto' : 'bg-gray-700 self-start mr-auto'}`}
      >
        {msg.text}
      </div>
    ))}
  </div>
);

export default ChatWindow;
