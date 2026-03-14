import React from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const baseLinks = [
        { path: '/', label: 'Home' },
        { path: '/classes', label: 'Classes' },
        { path: '/plans', label: 'Plans' },
        { path: '/about', label: 'About' },
        { path: '/location', label: 'HQ' },
    ];

    const privateLinks = user && !user.isGuest ? [
        { path: '/dashboard', label: 'Metrics' },
        { path: '/trainers', label: 'Mentors' },
        { path: '/video', label: 'Cyber Cardio' },
        { path: '/chat', label: 'Comms' }
    ] : [
        { path: '/contact', label: 'Comms' }
    ];

    const navLinks = [...baseLinks, ...privateLinks];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-trueBlack/70 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-2"
                    >
                        <FaBolt className="text-neonCyan text-3xl animate-pulse-glow" />
                        <span className="font-display text-2xl md:text-3xl tracking-widest text-white mt-1">POWER HOUSE <span className="text-neonPink">GYM</span></span>
                    </motion.div>
                </Link>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex items-center gap-8 font-body text-sm font-semibold tracking-widest uppercase text-grayMeta mt-1"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`transition-colors ${location.pathname === link.path ? 'text-neonCyan' : 'hover:text-neonPurple'}`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="h-4 w-px bg-white/20 mx-2" />

                    {user ? (
                        <div className="flex items-center gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-white"
                            >
                                <FaUserCircle className={user.isGuest ? "text-grayMeta" : "text-neonCyan"} />
                                <span className="font-display tracking-widest">
                                    WELCOME, <span className={user.isGuest ? "text-grayMeta" : "text-neonPink"}>{user.name}</span>
                                </span>
                            </motion.div>
                            {!user.isGuest && (
                                <Link to="/admin" className="text-neonCyan hover:text-white transition-colors text-xs font-display tracking-widest uppercase border border-neonCyan/30 hover:border-neonCyan px-2 py-1 rounded">
                                    ADMIN
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="text-grayMeta hover:text-red-400 transition-colors flex items-center gap-1"
                                title="Disconnect"
                            >
                                <FaSignOutAlt />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/auth"
                            className="btn-neon !px-6 !py-2 !text-sm flex items-center gap-2"
                        >
                            <span className="btn-neon-text hover:text-transparent">JOIN NOW</span>
                        </Link>
                    )}
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;
