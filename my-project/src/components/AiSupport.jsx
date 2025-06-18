import React, { useState } from 'react';
const AISupport = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! How can I help you with your learning today?' }
  ]);
  const [loading, setLoading] = useState(false);
const key=import.meta.env.VITE_OPENAI_API_KEY;
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <your_openrouter_key>",
  },
  body: JSON.stringify({
    model: "mistralai/mistral-7b-instruct", // or gpt-3.5-turbo, claude etc.
    messages: [],
  }),
});

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;

      if (reply) {
        setMessages([...newMessages, { role: 'assistant', content: reply }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I ran into an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-[300px] h-[400px] bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg flex flex-col p-3 text-white">
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'}`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded-lg text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button
          className="px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AISupport;
