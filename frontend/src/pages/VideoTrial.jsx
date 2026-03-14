import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaLock, FaCrown, FaBolt } from 'react-icons/fa';

const VideoTrial = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds trial
    const [isLocked, setIsLocked] = useState(false);
    const videoRef = useRef(null);

    // Mock trial logic
    useEffect(() => {
        let interval;
        if (isPlaying && timeLeft > 0 && !isLocked) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsLocked(true);
                        setIsPlaying(false);
                        if (videoRef.current) {
                            videoRef.current.pause();
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timeLeft === 0) {
            setIsLocked(true);
            setIsPlaying(false);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft, isLocked]);

    if (!user || user.isGuest) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-6">
                <div className="glass-card p-12 text-center max-w-lg border-red-500/30">
                    <FaLock className="text-5xl text-red-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-display text-white mb-4 tracking-widest">ACCESS DENIED</h2>
                    <p className="text-grayMeta font-body mb-8">Premium video telemetry is restricted to registered operatives. Authenticate to proceed.</p>
                    <button onClick={() => navigate('/auth')} className="btn-neon bg-neonCyan text-black">
                        <span className="btn-neon-text hover:text-transparent">INITIALIZE PROFILE</span>
                    </button>
                </div>
            </div>
        );
    }

    const togglePlay = () => {
        if (isLocked) return;

        if (isPlaying) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play().catch(e => console.error("Video play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <section className="min-h-screen pt-28 pb-20 px-6 relative z-10 max-w-6xl mx-auto flex flex-col items-center">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <div className="text-center mb-12 relative z-10 w-full">
                <div className="flex items-center justify-center gap-3 mb-2 text-neonPink">
                    <FaBolt className="text-2xl animate-pulse" />
                    <span className="font-body uppercase tracking-[0.3em] text-xs">High-Intensity Neural Link</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display tracking-widest text-white mb-4">
                    CYBER <span className="text-neonPink">CARDIO</span>
                </h1>

                {/* Timer Header */}
                {!isLocked && (
                    <div className="bg-black/60 border border-neonCyan/30 px-6 py-2 rounded-full inline-flex flex-col items-center mx-auto mt-4 backdrop-blur-sm shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                        <span className="text-[10px] text-grayMeta font-body tracking-widest uppercase mb-1">TRIAL TIME REMAINING</span>
                        <span className="text-3xl font-mono text-neonCyan font-bold drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                )}
            </div>

            {/* Video Container */}
            <div className="relative w-full max-w-5xl aspect-video glass-card p-0 overflow-hidden border-white/10 group shadow-[0_0_30px_rgba(0,0,0,0.8)]">

                {/* Pseudo Video Element (Using an image for safe cross-origin, but mimicking a player) */}
                <div className={`absolute inset-0 w-full h-full bg-black transition-all duration-1000 ${isLocked ? 'blur-md grayscale' : ''}`}>
                    <img
                        src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1920"
                        alt="Zumba Tracker"
                        className={`w-full h-full object-cover opacity-60 mix-blend-screen transition-transform duration-[60s] ${isPlaying ? 'scale-110' : 'scale-100'}`}
                    />
                    {/* Fake Video UI Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Play/Pause Button Overlay (Only when unlocked) */}
                {!isLocked && (
                    <button
                        onClick={togglePlay}
                        className={`absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all group z-20 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
                    >
                        <div className="w-20 h-20 rounded-full bg-neonPink/20 border-2 border-neonPink flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,0,127,0.5)]">
                            {isPlaying ? <FaPause className="text-3xl text-white ml-1" /> : <FaPlay className="text-3xl text-white ml-2" />}
                        </div>
                    </button>
                )}

                {/* Lock Overlay Content */}
                <AnimatePresence>
                    {isLocked && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-md"
                        >
                            <FaCrown className="text-6xl text-yellow-400 mb-6 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)] animate-pulse" />
                            <h2 className="text-5xl font-display text-white text-center mb-4 tracking-widest uppercase">
                                TRIAL COMPLETE
                            </h2>
                            <p className="text-lg text-grayMeta font-body font-light text-center max-w-xl mb-8">
                                Impressive effort, Operative. To continue pushing your limits and unlock the full 60-minute Cyber Cardio sequence, upgrade to a Premium Neural Link.
                            </p>

                            <div className="flex gap-4">
                                <button onClick={() => navigate('/plans')} className="btn-neon bg-yellow-400 text-black border-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.6)]">
                                    <span className="btn-neon-text hover:text-transparent">UPGRADE TO PREMIUM</span>
                                </button>
                                <button onClick={() => navigate('/dashboard')} className="px-6 py-4 border border-white/20 text-white font-display tracking-widest text-sm hover:bg-white/10 transition-colors uppercase rounded">
                                    Return to Dash
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default VideoTrial;
