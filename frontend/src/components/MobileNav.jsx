import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaDumbbell, FaChartLine, FaUser, FaComments } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const MobileNav = () => {
    const { user } = useAuth();

    const navItems = [
        { icon: <FaHome />, label: 'Home', path: '/' },
        { icon: <FaDumbbell />, label: 'Classes', path: '/classes' },
        { icon: <FaChartLine />, label: 'Stats', path: user && !user.isGuest ? '/dashboard' : '/plans' },
        { icon: <FaComments />, label: 'Chat', path: '/chat' },
        { icon: <FaUser />, label: 'Profile', path: '/auth' },
    ];

    return (
        <motion.nav 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 pointer-events-none"
        >
            <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl flex justify-around items-center p-2 shadow-2xl pointer-events-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300
                            ${isActive ? 'text-neonCyan' : 'text-gray-400 hover:text-white'}
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`text-xl ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className="text-[10px] font-medium mt-1 uppercase tracking-tighter">
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-neonCyan/10 rounded-2xl border border-neonCyan/20 -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </motion.nav>
    );
};

export default MobileNav;
