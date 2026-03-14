import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUser, FaEnvelope, FaCommentAlt } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section className="py-20 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl md:text-7xl font-display mb-4">
                    TRANSMIT <span className="text-neonCyan">SIGNAL</span>
                </h1>
                <p className="text-grayMeta text-lg">Leave your mark on the grid. We will respond.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full glass-card border-neonCyan/30 p-8 md:p-12 relative overflow-hidden"
            >
                {isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center backdrop-blur-sm"
                    >
                        <FaPaperPlane className="text-6xl text-neonCyan mb-6 animate-float" />
                        <h3 className="text-3xl font-display tracking-widest text-white">TRANSMISSION SENT</h3>
                        <p className="text-neonCyan tracking-widest font-body uppercase mt-2">Awaiting Reply...</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10 flex flex-col">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-grayMeta group-focus-within:text-neonCyan transition-colors">
                            <FaUser />
                        </div>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-darkGray/60 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white font-body focus:outline-none focus:border-neonCyan focus:bg-black/80 transition-all shadow-inner"
                            placeholder="OPERATIVE DESIGNATION (NAME)"
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-grayMeta group-focus-within:text-neonPink transition-colors">
                            <FaEnvelope />
                        </div>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-darkGray/60 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white font-body focus:outline-none focus:border-neonPink focus:bg-black/80 transition-all shadow-inner"
                            placeholder="COMMS CHANNEL (EMAIL)"
                        />
                    </div>

                    <div className="relative group flex-grow flex">
                        <div className="absolute top-4 left-0 flex items-start pl-4 pointer-events-none text-grayMeta group-focus-within:text-neonPurple transition-colors">
                            <FaCommentAlt />
                        </div>
                        <textarea
                            required
                            rows="5"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-darkGray/60 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white font-body focus:outline-none focus:border-neonPurple focus:bg-black/80 transition-all shadow-inner resize-none flex-grow"
                            placeholder="ENTER DIRECTIVE (MESSAGE)"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-5 rounded-lg bg-white text-black font-display text-xl tracking-widest uppercase hover:bg-neonCyan hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all duration-300 mt-4"
                    >
                        Initiate Transfer
                    </motion.button>
                </form>
            </motion.div>
        </section>
    );
};

export default Contact;
