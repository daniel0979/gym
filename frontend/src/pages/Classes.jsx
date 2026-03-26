import React from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaFire, FaHeartbeat, FaDumbbell, FaArrowRight } from 'react-icons/fa';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const Classes = () => {
    const classesList = [
        { 
            title: "Neon Flow Yoga", 
            duration: "60 Min", 
            intensity: "Medium",
            icon: <FaHeartbeat />,
            color: "text-neonCyan", 
            border: "border-neonCyan/30",
            bg: "bg-neonCyan/5",
            desc: "Sync your breath with the rhythm of the city. A high-tech approach to ancient flow."
        },
        { 
            title: "Hypertrophy Grind", 
            duration: "90 Min", 
            intensity: "Extreme",
            icon: <FaDumbbell />,
            color: "text-neonPink", 
            border: "border-neonPink/30",
            bg: "bg-neonPink/5",
            desc: "Pure muscle recruitment. Olympic-level protocols for maximum mass and power."
        },
        { 
            title: "Void Cardio HIIT", 
            duration: "45 Min", 
            intensity: "High",
            icon: <FaBolt />,
            color: "text-neonPurple", 
            border: "border-neonPurple/30",
            bg: "bg-neonPurple/5",
            desc: "Zero-gravity intensity. Push your cardiovascular limits in our adrenaline suites."
        },
        { 
            title: "Cyber Core", 
            duration: "30 Min", 
            intensity: "High",
            icon: <FaFire />,
            color: "text-white", 
            border: "border-white/20",
            bg: "bg-white/5",
            desc: "Midsection optimization. Forged for stability and aesthetic perfection."
        }
    ];

    return (
        <div className="py-12 px-6 max-w-7xl mx-auto space-y-16 pb-32">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="text-center"
            >
                <div className="inline-block px-4 py-1 rounded-full border border-neonCyan/20 bg-neonCyan/5 mb-4">
                    <span className="text-neonCyan font-display text-[10px] tracking-[0.4em] uppercase font-bold">Training Protocols</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-display mb-6 tracking-tight uppercase leading-none">
                    ELITE <span className="text-gradient">MODULES</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-medium uppercase tracking-widest leading-relaxed">
                    Sync your body with our unparalleled programming. Find the module that pushes your limits.
                </p>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {classesList.map((cls, idx) => (
                    <motion.div
                        key={idx}
                        variants={fadeIn}
                        whileHover={{ y: -8 }}
                        className={`glass-morphism p-8 rounded-[2.5rem] group cursor-pointer border-2 ${cls.border} ${cls.bg} transition-all duration-500`}
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div className={`p-4 rounded-2xl bg-white/5 ${cls.color} text-3xl shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                                {cls.icon}
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Intensity</span>
                                <span className={`${cls.color} font-display text-sm tracking-widest uppercase`}>{cls.intensity}</span>
                            </div>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-display tracking-wider text-white mb-4 uppercase group-hover:text-gradient transition-all">{cls.title}</h3>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 max-w-md">
                            {cls.desc}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Duration</span>
                                    <span className="text-white font-display text-lg tracking-widest">{cls.duration}</span>
                                </div>
                            </div>
                            <button className={`flex items-center gap-2 font-display text-sm tracking-[0.2em] uppercase ${cls.color} group-hover:gap-4 transition-all`}>
                                Reserve Slot <FaArrowRight />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Classes;
