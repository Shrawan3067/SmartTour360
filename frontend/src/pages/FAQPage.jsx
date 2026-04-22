import React, { useState } from 'react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'Booking & Reservations',
      icon: '📋',
      questions: [
        {
          question: 'How do I make a booking?',
          answer: 'Simply browse our destinations, select your preferred trip, choose your travel dates and number of travelers, and proceed to payment. You can book directly through our website or mobile app.'
        },
        {
          question: 'Can I modify my booking after confirmation?',
          answer: 'Yes, you can modify your booking up to 48 hours before the travel date, subject to availability. Log into your dashboard or contact our support team for assistance.'
        },
        {
          question: 'What is your cancellation policy?',
          answer: 'We offer free cancellation up to 48 hours before travel. Cancellations made within 48-24 hours receive a 50% refund. No refund is available for cancellations within 24 hours of travel.'
        }
      ]
    },
    {
      category: 'Payments & Pricing',
      icon: '💳',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards, UPI, net banking, and popular digital wallets like Paytm, Google Pay, and PhonePe.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard SSL encryption and comply with PCI DSS standards. Your payment information is never stored on our servers.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No, we believe in transparent pricing. The price you see includes all taxes and service fees. There are no hidden charges or surprise costs.'
        }
      ]
    },
    {
      category: 'Travel & Experience',
      icon: '✈️',
      questions: [
        {
          question: 'What should I pack for my trip?',
          answer: 'Packing recommendations vary by destination. You will receive a detailed packing guide in your confirmation email. Generally, we recommend comfortable clothing, walking shoes, sunscreen, and any personal medications.'
        },
        {
          question: 'Are meals included in the package?',
          answer: 'Meal inclusions vary by package. Each destination page clearly specifies what is included. Most packages include breakfast, with some offering lunch and dinner options.'
        },
        {
          question: 'Is travel insurance included?',
          answer: 'Basic travel insurance is included in all our packages. You can also purchase comprehensive travel insurance at checkout for additional coverage.'
        }
      ]
    },
    {
      category: 'Account & Support',
      icon: '👤',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click the Sign Up button on our website or app. You can sign up using your email address or social media accounts. Creating an account gives you access to exclusive deals and easier booking management.'
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Click Forgot Password on the login page. We will send a password reset link to your registered email address. Follow the instructions to create a new password.'
        },
        {
          question: 'How do I contact customer support?',
          answer: 'You can reach us 24/7 via live chat on our website or app, email at support@smarttour360.com, or call our toll-free number 1800-123-4567.'
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Find answers to common questions about booking, payments, travel, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">No results found for "{searchQuery}"</p>
            <p className="text-gray-500 mt-2">Try different keywords or browse all categories below</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">{category.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === index;
                  
                  return (
                    <div key={questionIndex} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 pt-0">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can not find the answer you are looking for? Our friendly team is here to help.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Contact Support
              </a>
              <a
                href="/destinations"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Browse Destinations
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
