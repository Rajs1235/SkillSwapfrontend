import { useState, useRef, useEffect } from 'react';

const ChatComponent = ({ chatPartner = 'DeepSeek' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'DeepSeek',
      text: 'Hello! I\'m your AI assistant. How can I help you with your skill exchange today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || isLoading) return;
    
    // Add user message
    const userMsg = {
      id: messages.length + 1,
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    setIsLoading(true);

    try {
      // Call DeepSeek API (mock implementation - replace with actual API call)
      const response = await fetchDeepSeekResponse(newMessage);
      
      // Add AI response
      const aiMsg = {
        id: messages.length + 2,
        sender: 'DeepSeek',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Error calling DeepSeek:', error);
      const errorMsg = {
        id: messages.length + 2,
        sender: 'DeepSeek',
        text: 'Sorry, I encountered an error. Could you try again?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock API call - replace with actual DeepSeek API integration
  const fetchDeepSeekResponse = async (message) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate context-aware responses
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('react') || lowerMsg.includes('javascript')) {
      return "I can definitely help with React and JavaScript! What specific concepts are you looking to exchange or learn about?";
    }
    
    if (lowerMsg.includes('skill') || lowerMsg.includes('exchange')) {
      return "For skill exchanges, I recommend focusing on complementary skills. What's your primary skill to offer?";
    }
    
    if (lowerMsg.includes('time') || lowerMsg.includes('schedule')) {
      return "I can help coordinate schedules. When are you typically available for skill exchange sessions?";
    }
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return "Hi there! Ready to exchange some skills? What would you like to discuss?";
    }
    
    // Default intelligent response
    return `I understand you're asking about "${message}". In the context of skill exchange, this could relate to finding compatible learning partners or identifying complementary skills. Could you elaborate on your specific needs?`;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="partner-info">
          <div className="avatar">AI</div>
          <div>
            <h2>Chat with {chatPartner}</h2>
            <p className="status">{isLoading ? 'Typing...' : 'Online'}</p>
          </div>
        </div>
        <div className="skill-tags">
          <span className="tag react">React</span>
          <span className="tag js">JavaScript</span>
          <span className="tag ai">AI</span>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}
          >
            {message.sender !== 'You' && (
              <div className="avatar small">{message.sender.charAt(0)}</div>
            )}
            <div className="message-content">
              {message.sender !== 'You' && <span className="sender-name">{message.sender}</span>}
              <p>{message.text}</p>
              <span className="message-time">{message.time}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message received">
            <div className="avatar small">AI</div>
            <div className="message-content">
              <span className="sender-name">DeepSeek</span>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`Message ${chatPartner}...`}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
