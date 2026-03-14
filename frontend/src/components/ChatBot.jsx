import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaLocationArrow, FaPaperPlane } from 'react-icons/fa';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "INITIATING PROTOCOL: Power House Assistant online. How can I help you dominate today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const endOfMessagesRef = useRef(null);

    const predefinedAnswers = {
        location: "Power House Gym is located precisely in the heart of Yangon, Sector 7.",
        hours: "Our facility operates 24/7. Your schedule is no longer an excuse.",
        price: "Our plans start at $149 for a 3-month Operative tier. Ask about the Cyber Punk tier if you want the best.",
        default: "I am a basic support construct. Please navigate to our Contact page for detailed inquiries."
    };

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        const lowerInput = input.toLowerCase();
        let botResponse = predefinedAnswers.default;

        if (lowerInput.includes('where') || lowerInput.includes('location') || lowerInput.includes('address')) {
            botResponse = predefinedAnswers.location;
        } else if (lowerInput.includes('time') || lowerInput.includes('hour') || lowerInput.includes('open')) {
            botResponse = predefinedAnswers.hours;
        } else if (lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('plan')) {
            botResponse = predefinedAnswers.price;
        }

        setTimeout(() => {
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        }, 600);

        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="mb-4 w-80 md:w-96 h-[400px] flex flex-col glass-card border-neonCyan p-0 overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.2)]"
                    >
                        {/* Header */}
                        <div className="bg-black/80 px-4 py-3 border-b border-neonCyan/30 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <FaRobot className="text-neonCyan animate-pulse-glow" />
                                <span className="font-display tracking-widest text-sm text-white">SYSTEM BOT</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-grayMeta hover:text-white transition-colors"
                                aria-label="Close Chat"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Message Area */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-darkGray/90 scrollbar-thin scrollbar-thumb-neonCyan/20">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={idx}
                                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <span className={`text-[10px] font-display tracking-widest uppercase mb-1 ${msg.sender === 'user' ? 'text-neonPink' : 'text-neonCyan'}`}>
                                        {msg.sender === 'user' ? 'GUEST' : 'BOT'}
                                    </span>
                                    <div
                                        className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm font-body shadow-md
                      ${msg.sender === 'user'
                                                ? 'bg-neonPink/20 border border-neonPink/50 text-white rounded-tr-none'
                                                : 'bg-neonCyan/10 border border-neonCyan/30 text-neonCyan rounded-tl-none font-light'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={endOfMessagesRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-black/80 border-t border-white/10 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Query system..."
                                className="flex-grow bg-darkGray/50 border border-white/20 rounded-full px-4 py-2 text-sm text-white font-body focus:outline-none focus:border-neonCyan transition-colors"
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleSend}
                                className="h-10 w-10 rounded-full flex items-center justify-center bg-neonCyan text-black hover:shadow-[0_0_15px_rgba(0,243,255,0.6)] transition-all"
                                aria-label="Send Message"
                            >
                                <FaPaperPlane className="text-sm ml-[-2px]" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-neonCyan flex items-center justify-center shadow-[0_0_25px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.6)] transition-all z-50 border-2 border-black"
                aria-label="Toggle Chat"
            >
                {isOpen ? <FaTimes className="text-black text-2xl" /> : <FaRobot className="text-black text-3xl" />}
            </motion.button>
        </div>
    );
};

export default ChatBot;
