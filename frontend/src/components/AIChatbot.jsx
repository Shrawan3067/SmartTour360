import React, { useState, useRef, useEffect } from 'react';
import { Button } from './UI';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hi! I\'m your AI travel assistant. I can help you plan trips, find destinations, or answer questions about SmartTour360. How can I help you today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Add custom animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shine {
        0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
      }
      .animate-shine {
        animation: shine 1s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you plan your trip! What destinations are you considering?",
        "That's a great question! SmartTour360 offers over 200 destinations across 15 countries with a focus on cultural heritage sites.",
        "I can help you find the perfect destination. Are you interested in heritage sites, nature experiences, or cultural festivals?",
        "Our eco-friendly tours are carbon-neutral and support local communities. Would you like to know more about our sustainability initiatives?",
        "For flight bookings, I recommend checking our flight booking page where you can compare prices and schedules from multiple airlines.",
        "We have amazing heritage tours in Rajasthan, Kerala, and Tamil Nadu. Which region interests you most?",
        "Our AI-powered trip planner can create personalized itineraries based on your preferences. Would you like to try it?",
        "All our bookings include 24/7 support and flexible cancellation policies. Is there anything specific you'd like to know about our services?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickActions = [
    { label: 'Plan a Trip', icon: '🗺️', message: 'Help me plan a trip to India' },
    { label: 'Find Destinations', icon: '📍', message: 'Show me popular heritage destinations' },
    { label: 'Book Flight', icon: '✈️', message: 'How do I book a flight?' },
    { label: 'Sustainability', icon: '🌱', message: 'Tell me about your eco-friendly initiatives' },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Chat"
      >
        <svg className="w-7 h-7" viewBox="0 0 64 64" fill="none">
          {/* Robot head */}
          <rect x="16" y="12" width="32" height="28" rx="6" fill="currentColor" />
          {/* Antenna */}
          <rect x="30" y="4" width="4" height="8" fill="currentColor" />
          <circle cx="32" cy="3" r="3" fill="currentColor" />
          {/* Eyes */}
          <circle cx="24" cy="24" r="4" fill="white" />
          <circle cx="40" cy="24" r="4" fill="white" />
          {/* Eye shine */}
          <circle cx="25" cy="23" r="1.5" fill="#FF6B00" />
          <circle cx="41" cy="23" r="1.5" fill="#FF6B00" />
          {/* Mouth */}
          <rect x="24" y="32" width="16" height="3" rx="1.5" fill="white" />
          {/* Ears */}
          <rect x="10" y="20" width="6" height="12" rx="2" fill="currentColor" />
          <rect x="48" y="20" width="6" height="12" rx="2" fill="currentColor" />
          {/* Neck */}
          <rect x="28" y="40" width="8" height="6" fill="currentColor" />
          {/* Body */}
          <rect x="20" y="46" width="24" height="14" rx="4" fill="currentColor" opacity="0.8" />
        </svg>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] md:w-96 h-[500px] md:h-[600px] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 64 64" fill="none">
                {/* Robot head */}
                <rect x="16" y="12" width="32" height="28" rx="6" fill="currentColor" />
                {/* Antenna */}
                <rect x="30" y="4" width="4" height="8" fill="currentColor" />
                <circle cx="32" cy="3" r="3" fill="currentColor" />
                {/* Eyes */}
                <circle cx="24" cy="24" r="4" fill="white" />
                <circle cx="40" cy="24" r="4" fill="white" />
                {/* Eye shine */}
                <circle cx="25" cy="23" r="1.5" fill="#FF6B00" />
                <circle cx="41" cy="23" r="1.5" fill="#FF6B00" />
                {/* Mouth */}
                <rect x="24" y="32" width="16" height="3" rx="1.5" fill="white" />
                {/* Ears */}
                <rect x="10" y="20" width="6" height="12" rx="2" fill="currentColor" />
                <rect x="48" y="20" width="6" height="12" rx="2" fill="currentColor" />
                {/* Neck */}
                <rect x="28" y="40" width="8" height="6" fill="currentColor" />
                {/* Body */}
                <rect x="20" y="46" width="24" height="14" rx="4" fill="currentColor" opacity="0.8" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>AI Travel Assistant</h3>
              <p className="text-xs text-white/80">Online • Ready to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-br-md'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-bl-md'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-md p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="px-4 py-3 border-t border-stone-100 bg-white">
            <p className="text-xs text-stone-500 mb-2 font-medium">Quick Actions</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInput(action.message)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-orange-100 rounded-full text-xs font-medium text-stone-700 hover:text-orange-700 transition-colors whitespace-nowrap"
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-stone-100 rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 bg-stone-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!input.trim() || isTyping}
              className="px-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIChatbot;
