import React, { useState, useEffect } from 'react';
import { PrimaryInput, TextArea } from '../UI/formInputs'; 
import Button from '../UI/button';

export const DriveeChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);

  const languageOptions = [
    { code: 'en', name: 'English', flag: 'En' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: 'Ar' }
  ];

  const greetings = {
    en: "Hello! 👋 I'm Drivee, your driving assistant. How can I help you today?",
    fr: "Bonjour! 👋 Je suis Drivee, votre assistant de conduite. Comment puis-je vous aider aujourd'hui?",
    ar: "مرحبًا! 👋 أنا دريفي، مساعدك للقيادة. كيف يمكنني مساعدتك اليوم؟"
  };

  const botResponses = {
    en: [
      {
        triggers: ['offers', 'deals', 'packages'],
        response: "Please visit our 'Offers' section on the homepage."
      },
      {
        triggers: ['reserve', 'booking', 'schedule', 'login'],
        response: "To book a course, please login to your account first."
      },
      {
        triggers: ['hello', 'hi', 'hey'],
        response: "Hello! 😊 How can I assist you today?"
      }
    ],
    fr: [
      {
        triggers: ['offres', 'forfaits', 'packages'],
        response: "Veuillez visiter notre section 'Offres' sur la page d'accueil."
      },
      {
        triggers: ['réserver', 'réservation', 'disponibilité', 'connexion'],
        response: "Pour réserver, veuillez d'abord vous connecter à votre compte."
      },
      {
        triggers: ['bonjour', 'salut', 'coucou'],
        response: "Bonjour ! 😊 Comment puis-je vous aider ?"
      }
    ],
    ar: [
      {
        triggers: ['عروض', 'باقات', 'صفقات'],
        response: "يرجى زيارة قسم 'العروض' على الصفحة الرئيسية."
      },
      {
        triggers: ['حجز', 'موعد', 'حجوزات', 'تسجيل دخول'],
        response: "للحجز، يرجى تسجيل الدخول إلى حسابك أولاً."
      },
      {
        triggers: ['مرحبا', 'اهلا', 'السلام'],
        response: "مرحبًا! 😊 كيف يمكنني مساعدتك؟"
      }
    ]
  };

  const defaultResponses = {
    en: "Thank you for your message. For more info, please visit our website.",
    fr: "Merci pour votre message. Pour plus d'infos, visitez notre site.",
    ar: "شكرًا لك على رسالتك. لمزيد من المعلومات، يرجى زيارة موقعنا."
  };

  const selectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setShowLanguageSelector(false);
    setMessages([{
      text: greetings[lang],
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedLanguage) return;

    const userMessage = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let response = defaultResponses[selectedLanguage];
      const inputLower = inputValue.toLowerCase();
      
      for (const item of botResponses[selectedLanguage]) {
        if (item.triggers.some(trigger => inputLower.includes(trigger.toLowerCase()))) {
          response = item.response;
          break;
        }
      }

      const botMessage = {
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white shadow-lg rounded-small-md overflow-hidden z-50 border border-gray-300">
      {/* Header */}
      <div className="bg-primary text-white p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="font-bold text-sm">Drivee Assistant</h3>
        </div>
        <button 
          onClick={onClose} 
          className="text-white hover:text-gray-200 text-sm"
          aria-label="Close chat"
        >
          ×
        </button>
      </div>
      
      {/* Messages container */}
      <div className="h-64 p-3 overflow-y-auto chat-container bg-gray-50">
        {showLanguageSelector ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h4 className="text-sm font-medium mb-3">Select your language</h4>
            <div className="flex flex-col space-y-2 w-full px-4">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang.code)}
                  className="flex items-center justify-center space-x-2 p-2 text-sm border border-gray-300 rounded-small-md hover:bg-blue-50"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-small-md text-sm ${msg.sender === 'bot' 
                    ? 'bg-white text-gray-800 border border-gray-200' 
                    : 'bg-primary text-white'}`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-white p-2 rounded-small-md border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Input area */}
      {!showLanguageSelector && (
        <form onSubmit={handleSend} className="p-2 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                selectedLanguage === 'en' ? "Type your message..." :
                selectedLanguage === 'fr' ? "Tapez votre message..." :
                "اكتب رسالتك..."
              }
              className="flex-1 p-2 text-sm border border-gray-300 rounded-small-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button 
              type="submit" 
              className="bg-primary text-white p-2 rounded-small-md hover:bg-primary-dark"
              disabled={!inputValue.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};