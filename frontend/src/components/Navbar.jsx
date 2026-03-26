import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaBolt, FaUserCircle, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const baseLinks = [
        { name: 'Home', path: '/' },
        { name: 'Classes', path: '/classes' },
        { name: 'Plans', path: '/plans' },
        { name: 'Location', path: '/location' },
    ];

    const privateLinks = user && !user.isGuest ? [
        { name: 'Metrics', path: '/dashboard' },
        { name: 'Mentors', path: '/trainers' },
        { name: 'Cyber Cardio', path: '/video' },
        { name: 'Comms', path: '/chat' }
    ] : [
        { name: 'Comms', path: '/contact' }
    ];

    const navLinks = [...baseLinks, ...privateLinks];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
                scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-neonCyan to-neonPurple rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.4)] group-hover:scale-110 transition-transform">
                        <FaBolt className="text-white text-xl" />
                    </div>
                    <span className="text-2xl font-display tracking-widest uppercase hidden sm:block">
                        POWER<span className="text-neonCyan">HOUSE</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative text-[10px] font-display uppercase tracking-[0.2em] transition-colors ${
                                location.pathname === link.path ? 'text-neonCyan' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="navUnderline"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neonCyan shadow-[0_0_8px_rgba(0,243,255,1)]"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Auth Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{user.name}</span>
                                <span className="text-[8px] font-bold text-neonPink uppercase tracking-widest">
                                    {user.isGuest ? 'Guest Operative' : 'Elite Member'}
                                </span>
                            </div>
                            
                            {user && !user.isGuest && (
                                <Link to="/admin" className="hidden md:flex w-10 h-10 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-neonCyan hover:bg-neonCyan/10 transition-all">
                                    <FaShieldAlt />
                                </Link>
                            )}

                            <button
                                onClick={() => { logout(); navigate('/'); }}
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-neonPink hover:border-neonPink/30 transition-all"
                                title="Disconnect"
                            >
                                <FaSignOutAlt />
                            </button>
                        </div>
                    ) : (
                        <Link to="/auth" className="btn-neon !px-6 !py-2 !text-sm">
                            <span className="btn-neon-text">Join Now</span>
                        </Link>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
