import React from 'react';
import { motion } from 'framer-motion';

const Plans = () => {
    const plans = [
        {
            title: "3 MONTHS",
            subtitle: "THE INITIATIVE",
            price: "$149",
            color: "text-neonCyan",
            border: "border-neonCyan/30",
            button: "bg-neonCyan text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]",
            features: ["Full 24/7 Facility Access", "Standard Recovery Lounge", "Locker Included"],
        },
        {
            title: "6 MONTHS",
            subtitle: "THE GRIND",
            price: "$279",
            color: "text-neonPink",
            border: "border-neonPink shadow-[0_0_30px_-10px_rgba(255,0,127,0.3)]",
            button: "bg-gradient-to-r from-neonPink to-neonPurple text-white hover:shadow-[0_0_20px_rgba(255,0,127,0.6)]",
            popular: true,
            features: ["Everything in 3 Months", "Advanced Bio-metrics Tracking", "1x Personal Pro Session/mo"],
        },
        {
            title: "ANNUAL",
            subtitle: "THE CHAMPION",
            price: "$499",
            color: "text-neonPurple",
            border: "border-neonPurple/30",
            button: "bg-neonPurple text-white hover:shadow-[0_0_20px_rgba(176,38,255,0.6)]",
            features: ["Everything in 6 Months", "VIP Gear Storage", "Unlimited Guest Passes (Weekends)"],
        }
    ];

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-6xl md:text-8xl font-display mb-4">COMMIT <span className="text-neonPink">NOW</span></h1>
                <p className="text-grayMeta max-w-2xl mx-auto text-lg leading-relaxed">
                    Weakness is a choice. Dominate the present by locking in your future. Select the protocol that fits your destiny.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className={`glass-card flex flex-col relative ${plan.border} ${plan.popular ? 'md:-translate-y-4 z-10' : ''}`}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 right-0 bg-neonPink text-black text-xs font-bold px-6 py-2 tracking-widest uppercase rounded-bl-xl z-20">
                                RECOMMENDED
                            </div>
                        )}
                        <h3 className={`text-xl font-bold tracking-[0.3em] font-body text-grayMeta mb-1`}>{plan.title}</h3>
                        <h4 className={`text-3xl font-display ${plan.color} mb-6 tracking-widest`}>{plan.subtitle}</h4>

                        <div className="text-6xl font-display text-white mb-2">{plan.price}</div>
                        <div className="text-sm font-body text-grayMeta/60 uppercase tracking-widest mb-10 pb-6 border-b border-white/10">Billed Upfront</div>

                        <ul className="space-y-4 text-sm text-grayMeta mb-10 flex-grow font-body">
                            {plan.features.map((feat, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className={plan.color}>✓</span> {feat}
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-4 rounded-full font-display tracking-widest uppercase text-xl transition-all duration-300 ${plan.button}`}>
                            Select {plan.title}
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Plans;
