import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaSubway, FaCar } from 'react-icons/fa';

const Location = () => {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center min-h-[80vh]">
            {/* Visual Tech Map */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 h-[500px] border border-neonPink/30 rounded-2xl relative overflow-hidden bg-black flex items-center justify-center p-8 group"
            >
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-tr from-neonPink/10 to-transparent pointer-events-none" />

                {/* Mock Map UI Elements */}
                <div className="relative w-full h-full border border-white/5 rounded-xl bg-darkGray/50 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-inner">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute rounded-full border border-neonPink w-[300px] h-[300px]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute rounded-full border border-neonCyan w-[150px] h-[150px]"
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            className="text-5xl text-neonPink drop-shadow-[0_0_15px_rgba(255,0,127,1)] mb-2"
                        >
                            <FaMapMarkerAlt />
                        </motion.div>
                        <div className="bg-black/80 px-4 py-2 border border-neonPink/50 rounded font-display tracking-widest text-white text-sm">
                            PHG SECTOR 7
                        </div>
                        <div className="font-body text-[10px] uppercase text-neonCyan mt-2 tracking-[0.3em]">
                            LAT: 16.8409 LON: 96.1735
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Info Panel */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 flex flex-col justify-center"
            >
                <h1 className="text-5xl md:text-7xl font-display mb-6">
                    LOCATE <span className="text-neonPink">HQ</span>
                </h1>
                <p className="text-grayMeta text-lg mb-10 leading-relaxed font-light">
                    Situated deep in the neon grid of Yangon, Power House Gym is accessible via multiple sub-routes. Proceed to coordinates to initiate your training sequence.
                </p>

                <div className="space-y-8 glass-card border-white/10 p-8">
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-full bg-neonPink/10 border border-neonPink/30 flex items-center justify-center flex-shrink-0">
                            <FaMapMarkerAlt className="text-neonPink text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-display tracking-widest text-white mb-1">STREET LEVEL</h3>
                            <p className="text-grayMeta font-body text-sm">2049 Neon Avenue, Sector 7, Downtown Yangon Hub.</p>
                        </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-full bg-neonCyan/10 border border-neonCyan/30 flex items-center justify-center flex-shrink-0">
                            <FaSubway className="text-neonCyan text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-display tracking-widest text-white mb-1">TRANSIT LINK</h3>
                            <p className="text-grayMeta font-body text-sm">Central Station Grid. 5 minutes walk east from the main terminal.</p>
                        </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center flex-shrink-0">
                            <FaCar className="text-white text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-display tracking-widest text-white mb-1">DOCKING</h3>
                            <p className="text-grayMeta font-body text-sm">Underground secure EV parking available for Pro Members.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Location;
