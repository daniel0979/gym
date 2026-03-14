import React from 'react';
import { Link } from 'react-router-dom';
import { FaBolt, FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="py-16 bg-black border-t border-white/10 relative z-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <FaBolt className="text-neonCyan text-3xl" />
                        <span className="font-display text-3xl tracking-widest text-white mt-1">POWER HOUSE <span className="text-neonPink">GYM</span></span>
                    </div>
                    <p className="text-grayMeta text-sm max-w-sm mb-4">
                        Pushing the boundaries of human performance in a cyberpunk realm.
                    </p>
                    <p className="text-xs text-grayMeta/50 font-body uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} Copyright. Power House Gym. All rights reserved.
                    </p>
                </div>
                <div className="flex flex-col md:items-end gap-4 text-sm text-grayMeta tracking-wide">
                    <Link to="/location" className="flex items-center gap-3 hover:text-neonCyan transition-colors">
                        <FaMapMarkerAlt className="text-neonCyan/50" /> Yangon, Myanmar
                    </Link>
                    <a href="tel:09232390902" className="flex items-center gap-3 hover:text-neonPurple transition-colors">
                        <FaPhoneAlt className="text-neonPurple/50" /> 09232390902
                    </a>
                    <Link to="/contact" className="flex items-center gap-3 hover:text-neonPink transition-colors">
                        <FaClock className="text-neonPink/50" /> Submit Comms
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
