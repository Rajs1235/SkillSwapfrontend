import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
       setText('');
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      <input
        className="flex-1 p-2 rounded-lg text-black"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
