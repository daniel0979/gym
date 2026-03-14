import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="py-20 px-6 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="glass-card flex flex-col items-center text-center p-12 md:p-24 border-neonPurple/30"
            >
                <h1 className="text-5xl md:text-7xl font-display mb-8">
                    WE ARE <span className="text-neonPurple">POWER HOUSE</span>
                </h1>
                <p className="text-grayMeta text-xl md:text-2xl font-light mb-12 leading-relaxed">
                    Founded in the pulsing heart of Yangon, Power House Gym isn’t just a facility—it’s a collective of the relentless.
                    We built this sanctuary for those who refuse to let the city grind them down.
                    Here, you forge your own reality with sweat, neon, and heavy iron.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
                    <div className="border-t border-white/10 pt-6">
                        <h4 className="text-4xl font-display text-white mb-2">24/7</h4>
                        <p className="text-neonCyan tracking-widest text-xs uppercase">Always Open</p>
                    </div>
                    <div className="border-t border-white/10 pt-6">
                        <h4 className="text-4xl font-display text-white mb-2">10K+</h4>
                        <p className="text-neonPink tracking-widest text-xs uppercase">Sq.Ft Facility</p>
                    </div>
                    <div className="border-t border-white/10 pt-6">
                        <h4 className="text-4xl font-display text-white mb-2">100%</h4>
                        <p className="text-neonPurple tracking-widest text-xs uppercase">Commitment</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
