import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaRunning, FaShieldAlt, FaBolt, FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const sliderData = [
    {
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2000",
        title: "THE FORGE",
        subtitle: "Where iron meets determination.",
        color: "text-neonCyan",
        glow: "shadow-[0_0_30px_rgba(0,243,255,0.4)]"
    },
    {
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000",
        title: "VOID RUN",
        subtitle: "High-adrenaline cardio suites.",
        color: "text-neonPink",
        glow: "shadow-[0_0_30px_rgba(255,0,153,0.4)]"
    },
    {
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=2000",
        title: "SILENT GRIND",
        subtitle: "24/7 access. The city sleeps, you don't.",
        color: "text-neonPurple",
        glow: "shadow-[0_0_30px_rgba(176,38,255,0.4)]"
    }
];

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);

    return (
        <div className="space-y-16 pb-32">
            {/* Hero Section */}
            <section className="relative pt-10 pb-20 md:pt-32 md:pb-32 px-6 flex flex-col items-center justify-center min-h-[85vh] overflow-hidden">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="text-center z-10 max-w-4xl"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-darkGray/40 px-6 py-2 backdrop-blur-xl"
                    >
                        <span className="w-2 h-2 rounded-full bg-neonCyan animate-ping" />
                        <span className="bg-gradient-to-r from-neonCyan to-neonPurple bg-clip-text text-transparent text-[10px] font-bold tracking-[0.4em] uppercase">
                            Next-Gen Training Facility
                        </span>
                    </motion.div>

                    {user && !user.isGuest ? (
                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display mb-8 leading-none tracking-tight uppercase">
                            WELCOME <br />
                            <span className="text-gradient drop-shadow-[0_0_20px_rgba(0,243,255,0.3)]">{user.name.split(' ')[0]}</span>
                        </h1>
                    ) : (
                        <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-display mb-8 leading-[0.85] tracking-tighter">
                            POWER <br />
                            <span className="text-gradient drop-shadow-[0_0_30px_rgba(255,0,153,0.3)]">HOUSE</span>
                        </h1>
                    )}

                    <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-12 font-body font-medium tracking-wide leading-relaxed px-4">
                        Step into the future of physical evolution. Neon-infused environments, heavy iron, and a community of elite operatives.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 px-6">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                            <Link to="/auth" className="btn-neon w-full sm:w-auto group">
                                <span className="btn-neon-text">Start Protocol</span>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                            <Link to="/classes" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-display text-xl tracking-widest hover:bg-white/10 transition-all w-full sm:w-auto">
                                <FaPlay className="text-sm text-neonCyan" /> Explore
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Background decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neonCyan rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neonPink rounded-full blur-[150px] animate-pulse delay-1000" />
                </div>
            </section>

            {/* Slider Section */}
            <section className="px-6 max-w-[90rem] mx-auto relative z-10">
                <div className="relative w-full h-[500px] md:h-[650px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute inset-0"
                        >
                            <img
                                src={sliderData[currentSlide].image}
                                alt="Gym Facility"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                        <motion.div
                            key={`text-${currentSlide}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="max-w-2xl"
                        >
                            <h3 className={`text-5xl md:text-8xl font-display ${sliderData[currentSlide].color} tracking-tight mb-4 uppercase leading-none drop-shadow-2xl`}>
                                {sliderData[currentSlide].title}
                            </h3>
                            <p className="text-white/80 text-lg md:text-2xl font-body font-medium tracking-wide mb-8 backdrop-blur-md bg-black/30 p-4 rounded-2xl border border-white/5 inline-block">
                                {sliderData[currentSlide].subtitle}
                            </p>
                        </motion.div>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                {sliderData.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-white' : 'w-3 bg-white/30'}`}
                                    />
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button onClick={prevSlide} className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-md">
                                    <FaChevronLeft className="text-white" />
                                </button>
                                <button onClick={nextSlide} className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-md">
                                    <FaChevronRight className="text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn}
                        className="mb-16"
                    >
                        <h2 className="text-5xl md:text-7xl font-display mb-4 uppercase tracking-tighter">CYBER <span className="text-neonPink">CORE</span></h2>
                        <p className="text-gray-500 max-w-xl text-lg font-medium uppercase tracking-widest">Equipped with state-of-the-art tech and the heaviest iron.</p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {[
                            { icon: <FaDumbbell />, title: 'Pure Strength', desc: 'Olympic platforms, custom plates, and racks that outlast you.', color: 'text-neonPink', bg: 'bg-neonPink/5' },
                            { icon: <FaRunning />, title: 'Hyper Cardio', desc: 'Zero-gravity treadmills and assault bikes from the void.', color: 'text-neonCyan', bg: 'bg-neonCyan/5' },
                            { icon: <FaShieldAlt />, title: 'Iron Clad', desc: '24/7 biometric access. Train when the city sleeps.', color: 'text-neonPurple', bg: 'bg-neonPurple/5' }
                        ].map((feat, i) => (
                            <motion.div 
                                key={i} 
                                variants={fadeIn} 
                                className={`glass-morphism p-8 rounded-[2.5rem] group hover:border-white/20 transition-all duration-500 ${feat.bg}`}
                            >
                                <div className={`text-5xl ${feat.color} mb-8 transform transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500`}>
                                    {feat.icon}
                                </div>
                                <h3 className="text-3xl font-display tracking-wider mb-4 text-white uppercase">{feat.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-medium">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
