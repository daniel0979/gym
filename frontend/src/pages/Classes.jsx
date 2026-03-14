import React from 'react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const Classes = () => {
    const classesList = [
        { title: "Neon Flow Yoga", duration: "60 Min", glow: "shadow-[0_0_20px_rgba(0,243,255,0.3)]", border: "border-neonCyan" },
        { title: "Hypertrophy Grind", duration: "90 Min", glow: "shadow-[0_0_20px_rgba(255,0,127,0.3)]", border: "border-neonPink" },
        { title: "Void Cardio HIIT", duration: "45 Min", glow: "shadow-[0_0_20px_rgba(176,38,255,0.3)]", border: "border-neonPurple" },
        { title: "Cyber Core", duration: "30 Min", glow: "shadow-[0_0_20px_rgba(255,255,255,0.2)]", border: "border-white/50" }
    ];

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-6xl md:text-8xl font-display mb-4">TRAINING <span className="text-neonCyan">MODULES</span></h1>
                <p className="text-grayMeta max-w-2xl mx-auto text-lg">
                    Sync your body with our unparalleled programming. Find the module that pushes your limits.
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {classesList.map((cls, idx) => (
                    <motion.div
                        key={idx}
                        variants={item}
                        className={`glass-card group cursor-pointer border hover:${cls.border} ${cls.glow} transition-all duration-300`}
                    >
                        <h3 className="text-2xl font-display tracking-widest text-white mb-2">{cls.title}</h3>
                        <p className="text-grayMeta font-body font-bold bg-darkGray inline-block px-3 py-1 rounded border border-white/10 uppercase tracking-widest text-xs">
                            {cls.duration}
                        </p>
                        <div className="mt-8 h-1 w-0 bg-white group-hover:w-full transition-all duration-500" />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Classes;
