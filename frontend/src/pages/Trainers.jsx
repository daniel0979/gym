import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserNinja, FaRobot, FaBolt, FaCheckCircle, FaCreditCard, FaLock, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const trainers = [
    {
        id: "PT-01",
        name: "VALERIA 'CYBER' VOID",
        specialty: "Hyper-Agility & Core",
        rate: "$85/Session",
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800",
        tag: "ELITE TIER",
        color: "text-neonPink",
        border: "border-neonPink/50"
    },
    {
        id: "PT-02",
        name: "MARCUS 'IRON' GRAVES",
        specialty: "Absolute Hypertrophy",
        rate: "$70/Session",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800",
        tag: "VETERAN",
        color: "text-neonCyan",
        border: "border-neonCyan/50"
    },
    {
        id: "PT-03",
        name: "NEXUS UNIT-X",
        specialty: "AI Form Correction",
        rate: "$45/Session",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
        tag: "SYNTHETIC",
        color: "text-neonPurple",
        border: "border-neonPurple/50"
    }
];

const Trainers = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    if (!user || user.isGuest) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-6">
                <div className="glass-card p-12 text-center max-w-lg border-red-500/30">
                    <FaLock className="text-5xl text-red-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-display text-white mb-4 tracking-widest">ACCESS DENIED</h2>
                    <p className="text-grayMeta font-body mb-8">Personal Trainer allocation is restricted to registered operatives. Authenticate to proceed.</p>
                    <button onClick={() => navigate('/auth')} className="btn-neon bg-neonCyan text-black">
                        <span className="btn-neon-text hover:text-transparent">INITIALIZE PROFILE</span>
                    </button>
                </div>
            </div>
        );
    }

    const handleSelect = (trainer) => {
        setSelectedTrainer(trainer);
        setIsCheckingOut(true);
    };

    const handlePayment = (e) => {
        e.preventDefault();
        // Mock payment processing time
        setTimeout(() => {
            setPaymentSuccess(true);
            setTimeout(() => {
                navigate('/chat');
            }, 2500);
        }, 1500);
    };

    const closeModal = () => {
        if (!paymentSuccess) {
            setIsCheckingOut(false);
            setSelectedTrainer(null);
        }
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="min-h-[100vh] pt-28 pb-20 px-6 relative z-10 max-w-7xl mx-auto">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
                <h1 className="text-5xl md:text-7xl font-display tracking-widest text-white mb-4">
                    CHOOSE YOUR <span className="text-neonCyan">MENTOR</span>
                </h1>
                <p className="text-grayMeta max-w-2xl mx-auto font-body tracking-wide">
                    Select an elite operative to guide your physical manifestation. Each trainer specializes in distinct protocols.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {trainers.map((pt, idx) => (
                    <motion.div
                        key={pt.id}
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: idx * 0.15 }}
                        className={`glass-card p-0 overflow-hidden border ${pt.border} group flex flex-col h-full`}
                    >
                        <div className="h-64 overflow-hidden relative">
                            {/* Decorative Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
                            <img
                                src={pt.image}
                                alt={pt.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                            />
                            <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md border ${pt.border} ${pt.color}`}>
                                {pt.tag}
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-2xl font-display tracking-widest text-white mb-1 group-hover:text-neonCyan transition-colors">{pt.name}</h3>
                            <p className="text-grayMeta font-body text-sm mb-4">{pt.specialty}</p>

                            <div className="mt-auto flex justify-between items-center">
                                <span className="text-white font-mono opacity-80">{pt.rate}</span>
                                <button
                                    onClick={() => handleSelect(pt)}
                                    className={`px-4 py-2 border ${pt.border} ${pt.color} rounded hover:bg-white/5 transition-colors text-sm font-body tracking-widest uppercase`}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Payment Modal Override */}
            <AnimatePresence>
                {isCheckingOut && selectedTrainer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-card max-w-md w-full p-8 border-neonCyan/50 relative overflow-hidden"
                        >
                            {/* Close Button */}
                            {!paymentSuccess && (
                                <button onClick={closeModal} className="absolute top-4 right-4 text-grayMeta hover:text-neonPink transition-colors">
                                    <FaTimes className="text-xl" />
                                </button>
                            )}

                            {paymentSuccess ? (
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <FaCheckCircle className="text-7xl text-neonCyan mx-auto mb-6 drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]" />
                                    </motion.div>
                                    <h3 className="text-3xl font-display text-white mb-2 tracking-widest">CONTRACT SECURED</h3>
                                    <p className="text-grayMeta font-body font-light">
                                        Funds transferred. Initializing secure comms link with <span className="text-neonCyan">{selectedTrainer.name}</span>...
                                    </p>
                                    <div className="mt-6 w-full h-1 bg-white/10 rounded overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 2.2 }}
                                            className="h-full bg-neonCyan"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-8">
                                        <FaCreditCard className="text-4xl text-neonCyan mx-auto mb-4" />
                                        <h3 className="text-3xl font-display text-white tracking-widest">SECURE LINK</h3>
                                        <p className="text-grayMeta text-sm font-body uppercase tracking-widest mt-1">Authenticate Transfer</p>
                                    </div>

                                    <div className="bg-black/40 border border-white/10 rounded-lg p-4 mb-6 flex justify-between items-center text-sm font-body">
                                        <span className="text-grayMeta">Target Operative: <br /><span className="text-white text-base">{selectedTrainer.name}</span></span>
                                        <span className="text-neonCyan text-xl font-mono">{selectedTrainer.rate}</span>
                                    </div>

                                    <form onSubmit={handlePayment} className="space-y-4">
                                        <input
                                            type="text"
                                            required
                                            placeholder="CARD NUMBER (MOCK 4242...)"
                                            className="w-full bg-darkGray/60 border border-white/10 rounded p-4 text-white font-body focus:outline-none focus:border-neonCyan focus:bg-black/80 transition-all font-mono text-sm"
                                        />
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                required
                                                placeholder="MM/YY"
                                                className="w-1/2 bg-darkGray/60 border border-white/10 rounded p-4 text-white font-body focus:outline-none focus:border-neonCyan focus:bg-black/80 transition-all font-mono text-sm uppercase"
                                            />
                                            <input
                                                type="text"
                                                required
                                                placeholder="CVC"
                                                className="w-1/2 bg-darkGray/60 border border-white/10 rounded p-4 text-white font-body focus:outline-none focus:border-neonCyan focus:bg-black/80 transition-all font-mono text-sm"
                                            />
                                        </div>
                                        <button type="submit" className="w-full bg-neonCyan text-black py-4 rounded font-display text-xl tracking-widest hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all uppercase mt-4">
                                            Execute Transfer
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default Trainers;
