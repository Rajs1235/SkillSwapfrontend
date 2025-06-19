import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Your backend URL

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (newMsg.trim()) {
      const message = { text: newMsg, timestamp: Date.now() };
      socket.emit('sendMessage', message);
      setNewMsg('');
    }
  };

  return (
    <div className="p-4">
      <div className="h-64 overflow-y-auto bg-gray-100 rounded p-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          className="flex-grow p-2 border rounded"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

