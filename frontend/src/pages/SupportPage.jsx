import React, { useState } from 'react';

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    bookingId: '',
    message: ''
  });
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hello! I'm your SmartTour360 AI guide. Need help with real-time transit or booking verification?",
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'user',
      message: "I need to check my Green Flag status.",
      timestamp: new Date()
    },
    {
      id: 3,
      type: 'bot',
      message: "I can help with that! Please provide your Booking ID or the name of the hotel you are inquiring about.",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      category: "Safety",
      question: "How do I verify a Green Flag hotel?",
      answer: "Simply look for the pulsing green beacon icon on the hotel's profile page. This indicates a verified real-time audit of their sustainability protocols. You can also click on the icon to view the full safety report including recent inspections and guest feedback.",
      expanded: false
    },
    {
      id: 2,
      category: "Security",
      question: "What is Blockchain ID login?",
      answer: "Blockchain ID login uses decentralized technology to create a tamper-proof identity verification system. Your credentials are encrypted and stored on the blockchain, giving you complete control over your personal data while ensuring maximum security against unauthorized access.",
      expanded: false
    },
    {
      id: 3,
      category: "Rewards",
      question: "How to get the first-trip discount?",
      answer: "New users automatically receive a ₹500 discount on their first booking! Simply create an account and apply the code 'WELCOME500' at checkout. The discount applies to both flight and hotel bookings with no minimum spend requirement.",
      expanded: false
    },
    {
      id: 4,
      category: "Payments",
      question: "Can I pay using decentralized assets?",
      answer: "Yes! SmartTour360 accepts major cryptocurrencies including Bitcoin, Ethereum, and USDT. All blockchain transactions are verified and recorded on our secure network, providing you with complete transparency and immutability.",
      expanded: false
    }
  ];

  const popularQuestions = [
    {
      id: 5,
      category: "Bookings",
      question: "How to modify or cancel a booking?",
      answer: "You can modify or cancel bookings up to 24 hours before departure through your dashboard. Cancellation charges may apply based on the booking policy.",
      expanded: false
    },
    {
      id: 6,
      category: "Safety",
      question: "What are the safety protocols for solo travelers?",
      answer: "We provide real-time safety alerts, 24/7 support, and verified Green Flag accommodations for solo travelers. Our AI monitors local conditions and alerts you of any potential risks.",
      expanded: false
    }
  ];

  const handleFaqToggle = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          type: 'user',
          message: newMessage,
          timestamp: new Date()
        }
      ]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: prev.length + 1,
          type: 'bot',
          message: "Thank you for your message! Our support team will get back to you shortly. In the meantime, you can check our FAQ section for quick answers.",
          timestamp: new Date()
        }]);
      }, 1000);
    }
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (formData.subject && formData.message) {
      alert(`Support ticket submitted! We'll get back to you within 2 hours.\n\nSubject: ${formData.subject}\nBooking ID: ${formData.bookingId || 'N/A'}`);
      setFormData({ subject: '', bookingId: '', message: '' });
    } else {
      alert('Please fill in subject and message fields.');
    }
  };

  const filteredFaqs = [...faqs, ...popularQuestions].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 text-center pt-16 pb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 12.728l-3.536-3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
          </svg>
          Support Center
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
          How can we{' '}
          <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
            help?
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Get instant answers to your questions or connect with our support team
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-gray-200 px-6 py-5 rounded-full text-lg font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder:text-gray-400"
            placeholder="Search for topics or questions..."
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="h-[2px] flex-grow mx-6 bg-gradient-to-r from-amber-200 to-transparent"></div>
          <a href="#" className="text-xs font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors">
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFaqs.slice(0, 4).map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleFaqToggle(faq.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-wider rounded-full">
                    {faq.category}
                  </span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedFaq === faq.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                  {faq.question}
                </h3>
                {expandedFaq === faq.id && (
                  <p className="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Options */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Support Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                  Email Support
                </h3>
                <p className="text-sm font-semibold text-gray-500">Response time: ~2 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-black tracking-wider text-amber-600 mb-1 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-medium"
                    placeholder="Issue category"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black tracking-wider text-amber-600 mb-1 block">
                    Booking ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.bookingId}
                    onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-medium"
                    placeholder="#ST360-XXXX"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-black tracking-wider text-amber-600 mb-1 block">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-medium resize-none"
                  placeholder="How can we assist you today?"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
              >
                Send Message
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </form>
          </div>

          {/* SmartBot 360 Chat */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-lg p-8 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                  SmartBot 360
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-bold text-emerald-600">Active Support</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-4 mb-6 max-h-96 overflow-y-auto">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                        : 'bg-white border border-gray-200 shadow-sm'
                    }`}
                  >
                    <p className={`text-sm font-semibold ${msg.type === 'user' ? 'text-white' : 'text-gray-700'}`}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2 mt-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full bg-white border-2 border-gray-200 px-4 py-3 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Type a message..."
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </div>
  );
};

export default SupportPage;