import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_BASE_URL.replace('/api/v1', ''), { autoConnect: false });

function ChatWindow() {
  const { roomId } = useParams();
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username') || 'You';
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/chat/${roomId}`);
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    if (roomId) fetchHistory();
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !userId) return;
    socket.connect();
    socket.emit('join_room', { roomId, userId });
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.emit('leave_room', { roomId, userId });
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [roomId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMsg.trim()) {
      const message = {
        roomId,
        senderId: userId,
        senderName: username,
        text: newMsg,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send_message', message);
      setMessages((prev) => [...prev, message]);
      setNewMsg('');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto text-black">
      <div className="h-96 overflow-y-auto bg-white rounded p-4 shadow-inner">
        {messages.map((m, i) => (
          <div key={i} className="mb-3">
            <div className="font-semibold text-blue-700">{m.senderName}:</div>
            <div className="text-gray-800">{m.text}</div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex">
        <input
          className="flex-grow p-2 border rounded"
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
