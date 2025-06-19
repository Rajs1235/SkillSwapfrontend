import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // change if deployed

const ChatComponent = ({ chatPartner = 'DeepSeek' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: chatPartner,
      text: `Hello! I'm your AI assistant. How can I help you with your skill exchange today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      const aiMsg = {
        id: messages.length + 1,
        sender: chatPartner,
        text: msg.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [messages, chatPartner]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    socket.emit('send_message', { text: newMessage });
    setNewMessage('');
  };

  return (
    <div className="chat-container max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-4">
      <div className="chat-header flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="avatar w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
            {chatPartner.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-lg">Chat with {chatPartner}</h2>
            <p className="text-sm text-green-400">{isLoading ? 'Typing...' : 'Online'}</p>
          </div>
        </div>
        <div className="skill-tags flex space-x-2">
          <span className="tag bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">React</span>
          <span className="tag bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">JavaScript</span>
          <span className="tag bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">AI</span>
        </div>
      </div>

      <div className="messages-container h-72 overflow-y-auto bg-gray-50 dark:bg-zinc-800 p-3 rounded mb-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message flex items-start mb-3 ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender !== 'You' && (
              <div className="avatar small w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center mr-2">
                {msg.sender.charAt(0)}
              </div>
            )}
            <div className="message-content max-w-xs bg-white dark:bg-zinc-700 text-black dark:text-white p-2 rounded-xl shadow">
              {msg.sender !== 'You' && <span className="sender-name font-semibold text-xs">{msg.sender}</span>}
              <p className="text-sm">{msg.text}</p>
              <span className="message-time text-xs text-gray-500 float-right mt-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message flex items-start mb-3">
            <div className="avatar small w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center mr-2">
              {chatPartner.charAt(0)}
            </div>
            <div className="message-content max-w-xs bg-white dark:bg-zinc-700 text-black dark:text-white p-2 rounded-xl shadow">
              <span className="sender-name font-semibold text-xs">{chatPartner}</span>
              <div className="typing-indicator flex space-x-1 mt-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="message-input flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
          placeholder={`Message ${chatPartner}...`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
        >
          {isLoading ? (
            <div className="spinner border-t-2 border-white rounded-full w-4 h-4 animate-spin mx-auto"></div>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
