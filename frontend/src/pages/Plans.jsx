import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaBolt, FaCrown, FaShieldAlt } from 'react-icons/fa';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Plans = () => {
    const plans = [
        {
            title: "3 MONTHS",
            subtitle: "THE INITIATIVE",
            price: "149",
            icon: <FaBolt />,
            color: "text-neonCyan",
            border: "border-neonCyan/20",
            bg: "bg-neonCyan/5",
            button: "bg-white text-black hover:bg-neonCyan hover:text-white shadow-xl",
            features: ["Full 24/7 Facility Access", "Standard Recovery Lounge", "Locker Included", "Digital Progress Tracking"],
        },
        {
            title: "6 MONTHS",
            subtitle: "THE GRIND",
            price: "279",
            icon: <FaCrown />,
            color: "text-neonPink",
            border: "border-neonPink/40",
            bg: "bg-neonPink/10",
            button: "bg-gradient-to-r from-neonPink to-neonPurple text-white shadow-[0_0_20px_rgba(255,0,127,0.4)]",
            popular: true,
            features: ["Everything in 3 Months", "Advanced Bio-metrics Tracking", "1x Personal Pro Session/mo", "Priority Class Booking"],
        },
        {
            title: "ANNUAL",
            subtitle: "THE CHAMPION",
            price: "499",
            icon: <FaShieldAlt />,
            color: "text-neonPurple",
            border: "border-neonPurple/20",
            bg: "bg-neonPurple/5",
            button: "bg-white text-black hover:bg-neonPurple hover:text-white shadow-xl",
            features: ["Everything in 6 Months", "VIP Gear Storage", "Unlimited Guest Passes", "Nutrition Blueprint AI"],
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
                <div className="inline-block px-4 py-1 rounded-full border border-neonPink/20 bg-neonPink/5 mb-4">
                    <span className="text-neonPink font-display text-[10px] tracking-[0.4em] uppercase font-bold">Membership Access</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-display mb-6 tracking-tight uppercase leading-none">
                    CHOOSE YOUR <span className="text-gradient">DESTINY</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-medium uppercase tracking-widest leading-relaxed">
                    Weakness is a choice. Dominate the present by locking in your future. Select the protocol that fits your evolution.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`glass-morphism p-8 rounded-[2.5rem] flex flex-col relative border-2 ${plan.border} ${plan.bg} ${plan.popular ? 'md:-translate-y-4 shadow-2xl z-10' : ''} group transition-all duration-500 hover:scale-[1.02]`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neonPink to-neonPurple text-white text-[10px] font-bold px-6 py-2 tracking-[0.3em] uppercase rounded-full shadow-lg">
                                Recommended
                            </div>
                        )}
                        
                        <div className="flex items-center justify-between mb-8">
                            <div className={`p-4 rounded-2xl bg-white/5 ${plan.color} text-2xl shadow-xl`}>
                                {plan.icon}
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Starting At</span>
                                <div className="flex items-baseline justify-end gap-1">
                                    <span className="text-white text-4xl font-display tracking-tighter">${plan.price}</span>
                                    <span className="text-gray-500 text-[10px] font-bold uppercase">USD</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className={`text-sm font-bold tracking-[0.3em] font-body text-gray-500 mb-1 uppercase`}>{plan.title}</h3>
                            <h4 className={`text-3xl font-display ${plan.color} tracking-widest uppercase`}>{plan.subtitle}</h4>
                        </div>

                        <div className="h-px w-full bg-white/5 mb-8" />

                        <ul className="space-y-4 mb-10 flex-grow">
                            {plan.features.map((feat, i) => (
                                <li key={i} className="flex items-center gap-4 text-sm font-medium text-gray-400">
                                    <div className={`w-5 h-5 rounded-full ${plan.bg} ${plan.color} flex items-center justify-center text-[10px] border border-white/5`}>
                                        <FaCheck />
                                    </div>
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-5 rounded-2xl font-display tracking-[0.2em] uppercase text-lg transition-all duration-300 ${plan.button}`}>
                            Initialize {plan.title}
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Plans;
