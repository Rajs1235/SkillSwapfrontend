import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_BASE_URL); // Use environment URL

const ChatComponent = ({ chatPartner = 'SkillMate' }) => {
  const { roomId } = useParams(); // <-- Get roomId from URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    socket.emit('joinRoom', roomId); // Join specific room

    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit('leaveRoom', roomId); // Leave on unmount
      socket.off('receive_message');
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageObj = {
      roomId,
      text: newMessage,
      sender: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, messageObj]);
    socket.emit('send_message', messageObj);
    setNewMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-4 text-white">
      <div className="text-xl font-bold mb-2">Chat Room: {roomId}</div>

      <div className="h-80 overflow-y-auto bg-zinc-800 p-3 rounded mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-lg shadow ${msg.sender === 'You' ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div className="text-sm">{msg.text}</div>
              <div className="text-xs text-gray-300 text-right">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow px-3 py-2 rounded-l bg-white text-black focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
