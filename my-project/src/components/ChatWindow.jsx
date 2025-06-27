import React, { useState } from 'react';
import { FaPaperPlane, FaSmile } from 'react-icons/fa';
const emojiCategories = {
  '😊': [
    '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉',
    '😊','😇','😍','😘','😗','😋','😜','🤪','😎','🤩',
    '😡','😠','😤','😢','😭','😞','😱','😰','😴','😷'
  ],
  '❤️': [
    '❤️','🧡','💛','💚','💙','💜','🖤','🤍','💔','💖','💘',
    '💝','💞','💗','💓','💟','❣️','💢','💫','💥','💯'
  ],
  '🎉': [
    '🎉','🎊','🎈','✨','🎇','🎆','🎁','🎂','🍰','🥳','🪅',
    '🍕','🍔','🍟','🍿','🍩','🍫','🍪','🍷','🍻','🥂'
  ]
};


const ChatWindow = () => {
  const [activeTab, setActiveTab] = useState('😊');

  const [messages, setMessages] = useState([
    { text: 'Hey there! 👋', sender: 'bot' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
    setShowEmojiPicker(false);
  };

  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji);
  };

  return (
    <div className="w-[700px] h-[500px] bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl text-white flex flex-col overflow-hidden relative">

      {/* Header */}
      <div className="px-6 py-4 border-b border-white/20 bg-white/10">
        <h2 className="text-xl font-semibold">John Doe</h2>
        <p className="text-sm text-green-400">● Online</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[70%] px-4 py-2 rounded-xl ${
              msg.sender === 'user'
                ? 'bg-green-600 self-end ml-auto'
                : 'bg-white/20'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

     {showEmojiPicker && (
  <div className="absolute bottom-24 left-6 z-50 w-64 bg-white/20 backdrop-blur-md p-3 rounded-xl">
    {/* Tabs */}
    <div className="flex justify-around mb-3">
      {Object.keys(emojiCategories).map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveTab(cat)}
          className={`text-2xl px-2 py-1 rounded-full transition ${
            activeTab === cat
              ? 'bg-white/30 scale-110'
              : 'hover:bg-white/10'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* Emojis */}
    <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30">
      {emojiCategories[activeTab].map((emoji, idx) => (
        <button
          key={idx}
          onClick={() => addEmoji(emoji)}
          className="text-xl hover:scale-125 transition"
        >
          {emoji}
        </button>
      ))}
    </div>
  </div>
)}

      {/* Input */}
      <div className="p-4 border-t border-white/20 bg-white/5">
        <div className="flex items-center bg-white/20 rounded-full px-4 py-2 backdrop-blur-md">
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-white hover:text-yellow-300 mr-3"
          >
            <FaSmile />
          </button>
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-3 p-2 rounded-full hover:bg-green-500 hover:scale-110 transition-all duration-200"
          >
            <FaPaperPlane className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
