import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaRunning, FaShieldAlt, FaBolt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const sliderData = [
    {
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2000",
        title: "THE FORGE",
        subtitle: "Where iron meets determination.",
        color: "text-neonCyan"
    },
    {
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000",
        title: "VOID RUN",
        subtitle: "High-adrenaline cardio suites.",
        color: "text-neonPink"
    },
    {
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=2000",
        title: "SILENT GRIND",
        subtitle: "24/7 access. The city sleeps, you don't.",
        color: "text-neonPurple"
    }
];

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh]">
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
                        className="mb-6 inline-block rounded-full border border-white/10 bg-darkGray/80 px-6 py-2 backdrop-blur-md"
                    >
                        <span className="bg-gradient-to-r from-neonCyan to-neonPurple bg-clip-text text-transparent text-sm font-bold tracking-[0.3em] uppercase">
                            Yangon's Premier Training Facility
                        </span>
                    </motion.div>

                    {user && !user.isGuest ? (
                        <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-display mb-6 leading-none tracking-tight uppercase break-words">
                            WELCOME <br />
                            <span className="text-gradient">{user.name}</span>
                        </h1>
                    ) : (
                        <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-display mb-6 leading-none tracking-tight">
                            POWER <br />
                            <span className="text-gradient">HOUSE</span>
                        </h1>
                    )}

                    <p className="text-grayMeta text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body font-light relative z-10">
                        Step into the future of training right here in Yangon. Neon lights, heavy iron, and a squad that refuses to quit. Rise above.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-20"
                    >
                        <Link to="/auth" className="btn-neon group inline-block">
                            <span className="btn-neon-text group-hover:text-transparent">Unleash Your Power</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Lobby Slider Section v3 (Premium) */}
            <section className="py-20 px-6 max-w-[90rem] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-10"
                >
                    <div>
                        <h2 className="text-4xl md:text-6xl font-display">
                            THE <span className="text-neonCyan">LOBBY</span>
                        </h2>
                        <p className="text-grayMeta font-body font-light tracking-wide mt-2">
                            A high-tech environment forged for champions.
                        </p>
                    </div>

                    <div className="flex gap-4 mt-6 md:mt-0">
                        <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md">
                            <FaChevronLeft className="text-white relative right-0.5" />
                        </button>
                        <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md">
                            <FaChevronRight className="text-white relative left-0.5" />
                        </button>
                    </div>
                </motion.div>

                <div className="relative w-full h-[500px] md:h-[700px] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.img
                            key={currentSlide}
                            src={sliderData[currentSlide].image}
                            alt="Gym Lobby"
                            initial={{ opacity: 0, scale: 1.1, x: 100 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -100 }}
                            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Deep gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-trueBlack via-trueBlack/40 to-transparent pointer-events-none" />

                    {/* Grid overlay for cyberpunk feel */}
                    <div className="absolute inset-0 bg-grid opacity-20 mix-blend-overlay pointer-events-none" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`text-${currentSlide}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="overflow-hidden mb-2">
                                    <h3 className={`text-4xl md:text-7xl font-display ${sliderData[currentSlide].color} tracking-wider drop-shadow-lg`}>
                                        {sliderData[currentSlide].title}
                                    </h3>
                                </div>
                                <p className="text-white/90 text-lg md:text-2xl font-body font-light tracking-wide max-w-xl backdrop-blur-sm bg-black/20 rounded-lg py-2 px-4 inline-block border border-white/5">
                                    {sliderData[currentSlide].subtitle}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress Indicators */}
                        <div className="flex gap-2 mt-8">
                            {sliderData.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-neonCyan shadow-[0_0_10px_rgba(0,243,255,0.8)]' : 'w-4 bg-white/30'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 px-6 relative z-10 bg-black/40 border-y border-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-7xl font-display mb-4">CYBER <span className="text-neonPink">CORE</span></h2>
                        <p className="text-grayMeta max-w-xl mx-auto text-lg">Equipped with state-of-the-art tech and the heaviest iron.</p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: <FaDumbbell />, title: 'Pure Strength', desc: 'Olympic platforms, custom plates, and racks that outlast you.', color: 'text-neonPink' },
                            { icon: <FaRunning />, title: 'Hyper Cardio', desc: 'Zero-gravity treadmills and assault bikes from the void.', color: 'text-neonCyan' },
                            { icon: <FaShieldAlt />, title: 'Iron Clad', desc: '24/7 biometric access in Yangon. Train when the city sleeps.', color: 'text-neonPurple' }
                        ].map((feat, i) => (
                            <motion.div key={i} variants={fadeIn} className="glass-card group flex flex-col items-center text-center">
                                <div className={`text-6xl ${feat.color} mb-8 transform transition-transform group-hover:scale-125 group-hover:rotate-12 duration-500 drop-shadow-[0_0_15px_currentColor]`}>
                                    {feat.icon}
                                </div>
                                <h3 className="text-3xl font-display tracking-widest mb-3 text-white">{feat.title}</h3>
                                <p className="text-grayMeta text-base leading-relaxed">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Home;
