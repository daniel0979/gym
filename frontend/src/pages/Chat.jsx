import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { FaPaperPlane, FaRobot, FaUserCircle, FaSignal, FaTerminal } from 'react-icons/fa';

// Mock initial chat history
const initialMessages = [
    { id: 1, sender: 'pt', text: "Operative recognized. I am VALERIA 'CYBER' VOID. State your primary objective.", timestamp: "09:00" },
    { id: 2, sender: 'user', text: "Looking to increase caloric burn by 20% this cycle.", timestamp: "09:02" },
    { id: 3, sender: 'pt', text: "Acknowledged. Updating your telemetry parameters. Prepare for High-Intensity Virtual Drills tomorrow at 0600.", timestamp: "09:05" }
];

const Chat = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    if (!user || user.isGuest) {
        return <Navigate to="/auth" replace />;
    }

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg = {
            id: Date.now(),
            sender: 'user',
            text: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Mock PT Response
        setTimeout(() => {
            const ptResponses = [
                "Telemetry received. Calculating optimal trajectory.",
                "Maintain your current caloric deficit. Do not deviate.",
                "Your vitals are stable. Increase load by 5kg on next set.",
                "Affirmative. Logging response to the main grid."
            ];
            const randomResponse = ptResponses[Math.floor(Math.random() * ptResponses.length)];

            const newPtMsg = {
                id: Date.now() + 1,
                sender: 'pt',
                text: randomResponse,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, newPtMsg]);
            setIsTyping(false);
        }, 2000);
    };

    return (
        <section className="min-h-screen pt-28 pb-8 px-4 md:px-6 relative z-10 max-w-5xl mx-auto flex flex-col h-[100vh]">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            {/* Header */}
            <div className="glass-card mb-4 p-4 border-neonCyan/30 flex justify-between items-center relative z-10 shrink-0 rounded-t-xl rounded-b-none">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=150"
                            alt="PT"
                            className="w-12 h-12 rounded-full object-cover border-2 border-neonCyan"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neonCyan rounded-full border-2 border-black animate-pulse shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
                    </div>
                    <div>
                        <h2 className="text-xl font-display tracking-widest text-white flex items-center gap-2">
                            VALERIA 'CYBER' VOID <FaRobot className="text-neonCyan text-sm" />
                        </h2>
                        <p className="text-grayMeta text-xs font-mono flex items-center gap-1">
                            <FaSignal className="text-neonCyan" /> ENCRYPTED P2P LINK
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-white text-xs font-mono bg-white/5 px-2 py-1 rounded">SECURE CHANNEL</span>
                    <span className="text-neonCyan text-[10px] uppercase font-body mt-1 animate-pulse">Recording Telemetry</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="glass-card flex-grow overflow-y-auto p-4 md:p-6 mb-4 flex flex-col gap-6 relative z-10 rounded-none border-t-0 border-b-0 border-neonCyan/10 scrollbar-thin scrollbar-thumb-neonCyan/20 scrollbar-track-transparent">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                {/* Avatar */}
                                <div className="shrink-0 mt-1">
                                    {msg.sender === 'user' ? (
                                        <div className="w-8 h-8 rounded-full bg-neonPink/20 flex items-center justify-center border border-neonPink/50">
                                            <FaUserCircle className="text-neonPink text-xl" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-neonCyan/20 flex items-center justify-center border border-neonCyan/50">
                                            <FaTerminal className="text-neonCyan text-sm" />
                                        </div>
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-4 rounded-2xl ${msg.sender === 'user'
                                            ? 'bg-neonPink/10 border border-neonPink/30 rounded-tr-sm text-white'
                                            : 'bg-black/80 border border-neonCyan/30 rounded-tl-sm text-neonCyan drop-shadow-[0_0_5px_rgba(0,243,255,0.2)]'
                                        }`}>
                                        <p className="font-body text-sm tracking-wide leading-relaxed">
                                            {msg.text}
                                        </p>
                                    </div>
                                    <span className="text-grayMeta text-[10px] font-mono mt-1 opacity-70">
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex justify-start"
                        >
                            <div className="flex gap-3 max-w-[70%]">
                                <div className="shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-neonCyan/20 flex items-center justify-center border border-neonCyan/50">
                                        <FaTerminal className="text-neonCyan text-sm" />
                                    </div>
                                </div>
                                <div className="bg-black/80 border border-neonCyan/30 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1">
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-neonCyan rounded-full" />
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-neonCyan rounded-full" />
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-neonCyan rounded-full" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="glass-card p-2 border-neonCyan/30 relative z-10 shrink-0 rounded-t-none rounded-b-xl focus-within:border-neonPink/50 transition-colors">
                <form onSubmit={handleSend} className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="TRANSMIT MESSAGE TO PT..."
                        className="flex-grow bg-transparent border-none focus:outline-none text-white font-body px-4 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${inputValue.trim() && !isTyping
                                ? 'bg-neonPink text-black hover:shadow-[0_0_15px_rgba(255,0,127,0.5)]'
                                : 'bg-white/10 text-grayMeta cursor-not-allowed'
                            }`}
                    >
                        <FaPaperPlane />
                    </button>
                </form>
            </div>

        </section>
    );
};

export default Chat;
