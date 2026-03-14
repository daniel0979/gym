import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaCheck, FaTimes, FaDumbbell } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login, continueAsGuest } = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    const passwordsMatch = formData.password.length > 0 && formData.password === formData.confirmPassword;
    const showConfirmStatus = !isLogin && formData.confirmPassword.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isLogin && !passwordsMatch) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            const endpoint = isLogin ? '/api/login' : '/api/register';
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : { name: formData.name, email: formData.email, password: formData.password };

            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            let data = {};
            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (!response.ok) {
                const message =
                    data.message ||
                    (data.errors ? Object.values(data.errors).flat().join(' ') : 'Request failed.');
                setError(message);
                return;
            }

            login({ ...data.user, isGuest: false });
            navigate('/');
        } catch (err) {
            setError('Unable to connect to server. Is the backend running?');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuest = () => {
        continueAsGuest();
        navigate('/');
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <section className="min-h-screen pt-24 pb-20 flex items-center justify-center px-6 relative z-10">
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md glass-card p-8 md:p-10 border-neonCyan/30 relative overflow-hidden"
            >
                <div className="text-center mb-8">
                    <FaDumbbell className="text-4xl text-neonCyan mx-auto mb-4 animate-pulse-glow" />
                    <h2 className="text-4xl font-display tracking-widest text-white">
                        {isLogin ? 'ENTER THE GRID' : 'FORGE PROFILE'}
                    </h2>
                    <p className="text-grayMeta text-sm font-body mt-2 uppercase tracking-widest">
                        {isLogin ? 'Initialize Connection' : 'Generate Registration'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10 flex flex-col">
                    <AnimatePresence mode="popLayout">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative group overflow-hidden"
                            >
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-grayMeta group-focus-within:text-neonPink transition-colors">
                                    <FaUser />
                                </div>
                                <input
                                    type="text"
                                    required={!isLogin}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-darkGray/60 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white font-body focus:outline-none focus:border-neonPink focus:bg-black/80 transition-all shadow-inner"
                                    placeholder="OPERATIVE NAME"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-grayMeta group-focus-within:text-neonCyan transition-colors">
                            <FaEnvelope />
                        </div>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-darkGray/60 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white font-body focus:outline-none focus:border-neonCyan focus:bg-black/80 transition-all shadow-inner"
                            placeholder="COMMS CHANNEL (EMAIL)"
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-grayMeta group-focus-within:text-neonPurple transition-colors">
                            <FaLock />
                        </div>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-darkGray/60 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white font-body focus:outline-none focus:border-neonPurple focus:bg-black/80 transition-all shadow-inner"
                            placeholder="SECURITY CODE (PASSWORD)"
                        />
                    </div>

                    <AnimatePresence mode="popLayout">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative group overflow-hidden"
                            >
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-grayMeta group-focus-within:text-neonPink transition-colors">
                                    <FaLock />
                                </div>
                                <input
                                    type="password"
                                    required={!isLogin}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full bg-darkGray/60 border border-white/10 rounded-lg pl-12 pr-12 py-4 text-white font-body focus:outline-none focus:border-neonPink focus:bg-black/80 transition-all shadow-inner"
                                    placeholder="CONFIRM SECURITY CODE"
                                />

                                {/* Advanced Password Match Animation logic */}
                                {showConfirmStatus && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={
                                            passwordsMatch
                                                ? { scale: 1, opacity: 1, rotate: [0, 15, -15, 0] }
                                                : { scale: 1, opacity: 1, x: [0, -5, 5, -5, 5, 0] }
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"
                                    >
                                        {passwordsMatch ? (
                                            <FaCheck className="text-neonCyan text-xl drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
                                        ) : (
                                            <FaTimes className="text-neonPink text-xl drop-shadow-[0_0_8px_rgba(255,0,127,0.8)]" />
                                        )}
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 mt-4 rounded-lg font-display text-xl tracking-widest uppercase transition-all duration-300 ${isLogin ? 'bg-neonCyan text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]' : 'bg-neonPink text-black hover:shadow-[0_0_20px_rgba(255,0,127,0.6)]'}`}
                    >
                        {isLoading ? 'Processing...' : (isLogin ? 'Authenticate' : 'Initialize Profile')}
                    </motion.button>
                </form>

                {error && (
                    <div className="mt-4 text-center text-neonPink text-sm font-body tracking-wide">
                        {error}
                    </div>
                )}

                <div className="mt-6 flex flex-col items-center gap-4 relative z-10">
                    <button
                        onClick={toggleMode}
                        className="text-grayMeta text-sm font-body uppercase tracking-widest hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                    >
                        {isLogin ? "Need access? Request profile." : "Already an operative? Access system."}
                    </button>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <button
                        onClick={handleGuest}
                        className="text-neonCyan/70 hover:text-neonCyan text-sm font-body uppercase tracking-widest transition-colors flex items-center gap-2"
                    >
                        <FaUser className="text-xs" /> Continue Without Profile
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default Auth;
