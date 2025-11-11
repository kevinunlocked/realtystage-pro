import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hi! I\'m your AI assistant. I can help you with staging suggestions, video creation tips, and scheduling optimization. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: getContextualResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getContextualResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    if (lowerMessage?.includes('staging') || lowerMessage?.includes('furniture')) {
      return 'For optimal staging results, I recommend focusing on neutral, contemporary furniture that appeals to the broadest audience. Consider adding warm lighting and plants to create an inviting atmosphere. Would you like specific suggestions for the room type you\'re working with?';
    }
    
    if (lowerMessage?.includes('video') || lowerMessage?.includes('recording')) {
      return 'For compelling property videos, ensure good lighting and smooth camera movements. I suggest starting with an exterior establishing shot, then flowing through the main living areas. The ideal video length is 60-90 seconds for social media. Need help with specific shot compositions?';
    }
    
    if (lowerMessage?.includes('social') || lowerMessage?.includes('schedule')) {
      return 'The best posting times for real estate content are typically Tuesday-Thursday, 10 AM-2 PM and 6-9 PM. I recommend posting property highlights on Instagram, detailed tours on Facebook, and professional shots on LinkedIn. Would you like me to suggest a posting schedule?';
    }
    
    return 'I can help you with AI staging suggestions, video creation guidance, social media optimization, and workflow tips. What specific aspect of your real estate marketing would you like to improve?';
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-elevation-2 transition-smooth"
        >
          <Icon name="MessageCircle" size={24} color="white" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-layout ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-96'
    }`}>
      <div className="bg-white border border-border rounded-lg shadow-elevation-2 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Bot" size={20} />
            <span className="font-medium">AI Assistant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Icon name={isMinimized ? 'Maximize2' : 'Minimize2'} size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages?.map((msg) => (
                <div
                  key={msg?.id}
                  className={`flex ${msg?.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      msg?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                    }`}
                  >
                    <p>{msg?.content}</p>
                    <span className={`text-xs mt-1 block ${
                      msg?.type === 'user' ?'text-primary-foreground/70' :'text-muted-foreground'
                    }`}>
                      {msg?.timestamp?.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground p-3 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Ask me anything about staging, videos, or scheduling..."
                  value={message}
                  onChange={(e) => setMessage(e?.target?.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message?.trim() || isTyping}
                  size="sm"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;