import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaCheck, FaTimes, FaBolt } from 'react-icons/fa';
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
        <div className="min-h-screen flex items-center justify-center px-6 relative z-10 py-20">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass-morphism p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden border-neonCyan/20"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-neonCyan to-neonPurple rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                        <FaBolt className="text-white text-3xl" />
                    </div>
                    <h2 className="text-4xl font-display tracking-tight text-white uppercase">
                        {isLogin ? 'SYSTEM <span class="text-neonCyan">LOGIN</span>' : 'CREATE <span class="text-neonPink">PROFILE</span>'}
                    </h2>
                    <p className="text-gray-500 text-[10px] font-bold mt-2 uppercase tracking-[0.3em]">
                        {isLogin ? 'Authenticate to proceed' : 'Join the elite ranks'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative"
                            >
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                                    <FaUser />
                                </div>
                                <input
                                    type="text"
                                    required={!isLogin}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white font-body focus:outline-none focus:border-neonPink transition-all"
                                    placeholder="OPERATIVE NAME"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                            <FaEnvelope />
                        </div>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white font-body focus:outline-none focus:border-neonCyan transition-all"
                            placeholder="EMAIL ADDRESS"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                            <FaLock />
                        </div>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white font-body focus:outline-none focus:border-neonPurple transition-all"
                            placeholder="SECURITY CODE"
                        />
                    </div>

                    {!isLogin && (
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                                <FaLock />
                            </div>
                            <input
                                type="password"
                                required={!isLogin}
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white font-body focus:outline-none focus:border-neonPink transition-all"
                                placeholder="CONFIRM CODE"
                            />
                            {showConfirmStatus && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    {passwordsMatch ? (
                                        <FaCheck className="text-neonCyan" />
                                    ) : (
                                        <FaTimes className="text-neonPink" />
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 mt-6 rounded-2xl font-display text-xl tracking-widest uppercase transition-all duration-300 shadow-xl ${isLogin ? 'bg-neonCyan text-black hover:bg-white' : 'bg-neonPink text-black hover:bg-white'}`}
                    >
                        {isLoading ? 'SYNCING...' : (isLogin ? 'AUTHENTICATE' : 'INITIALIZE')}
                    </button>
                </form>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-center text-neonPink text-[10px] font-bold uppercase tracking-widest"
                    >
                        {error}
                    </motion.div>
                )}

                <div className="mt-8 flex flex-col items-center gap-4">
                    <button
                        onClick={toggleMode}
                        className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                    >
                        {isLogin ? "Need a profile? Register" : "Already registered? Login"}
                    </button>

                    <div className="w-full h-px bg-white/5" />

                    <button
                        onClick={handleGuest}
                        className="text-neonCyan/60 hover:text-neonCyan text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2"
                    >
                        <FaUser className="text-[8px]" /> Continue as Guest
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
