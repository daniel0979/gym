import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
    FaFireAlt,
    FaWeight,
    FaDumbbell,
    FaHeartbeat,
    FaBolt,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

const CountUp = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.min(Math.floor(end * progress), end));
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
};

const Dashboard = () => {
    const { user } = useAuth();

    if (!user || user.isGuest) {
        return <Navigate to="/auth" replace />;
    }

    const activityData = [
        { day: 'Mon', calories: 2400 },
        { day: 'Tue', calories: 1398 },
        { day: 'Wed', calories: 3800 },
        { day: 'Thu', calories: 3908 },
        { day: 'Fri', calories: 4800 },
        { day: 'Sat', calories: 3800 },
        { day: 'Sun', calories: 4300 },
    ];

    const weightData = [
        { week: 'W1', weight: 85 },
        { week: 'W2', weight: 84.2 },
        { week: 'W3', weight: 83.5 },
        { week: 'W4', weight: 82.1 },
        { week: 'W5', weight: 81.0 },
        { week: 'W6', weight: 80.5 },
    ];

    const stats = [
        { icon: <FaFireAlt />, label: "Calories Burned (Weekly)", value: 24406, color: "text-neonPink", bg: "bg-neonPink/10 border-neonPink/30" },
        { icon: <FaWeight />, label: "Weight Dropped (kg)", value: 4.5, color: "text-neonCyan", bg: "bg-neonCyan/10 border-neonCyan/30" },
        { icon: <FaDumbbell />, label: "Grid Sessions", value: 14, color: "text-neonPurple", bg: "bg-neonPurple/10 border-neonPurple/30" },
        { icon: <FaHeartbeat />, label: "Avg BPM", value: 142, color: "text-red-500", bg: "bg-red-500/10 border-red-500/30" }
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="min-h-screen pt-28 pb-20 px-6 relative z-10 max-w-7xl mx-auto">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="relative z-10">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2 text-neonCyan">
                            <FaBolt className="text-2xl animate-pulse" />
                            <span className="font-body uppercase tracking-[0.3em] text-xs">Operative Telemetry Active</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display tracking-widest text-white uppercase">
                            DIAGNOSTICS: <span className="text-gradient drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">{user.name}</span>
                        </h1>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className={`glass-card p-6 border ${stat.bg} flex items-center justify-between group overflow-hidden relative`}
                        >
                            <div className="relative z-10">
                                <p className="text-grayMeta uppercase tracking-widest font-body text-[10px] mb-2">{stat.label}</p>
                                <h3 className={`text-3xl md:text-4xl font-display ${stat.color} drop-shadow-lg`}>
                                    <CountUp end={stat.value} duration={2} suffix={typeof stat.value === 'number' && stat.value % 1 !== 0 ? '' : ''} />
                                </h3>
                            </div>
                            <div className={`text-5xl ${stat.color} opacity-20 group-hover:scale-125 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500 absolute -right-4 -bottom-4`}>
                                {stat.icon}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Calorie Burn Area Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card p-6 border-white/10"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-display tracking-widest text-white flex items-center gap-2">
                                <FaFireAlt className="text-neonPink" /> ENERGY EXPENDITURE
                            </h3>
                            <span className="text-xs font-body text-neonPink bg-neonPink/10 px-3 py-1 rounded-full border border-neonPink/30">+14% vs Last Week</span>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={activityData}>
                                    <defs>
                                        <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ff007f" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#ff007f" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" tick={{ fontFamily: 'Space Grotesk', fontSize: 12 }} />
                                    <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fontFamily: 'Space Grotesk', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,0,127,0.3)', backdropFilter: 'blur(10px)' }}
                                        itemStyle={{ color: '#ff007f', fontFamily: 'Space Grotesk' }}
                                    />
                                    <Area type="monotone" dataKey="calories" stroke="#ff007f" strokeWidth={3} fillOpacity={1} fill="url(#colorCalories)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Weight Loss Bar Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-6 border-white/10"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-display tracking-widest text-white flex items-center gap-2">
                                <FaWeight className="text-neonCyan" /> MASS REDUCTION TRAJECTORY
                            </h3>
                            <span className="text-xs font-body text-neonCyan bg-neonCyan/10 px-3 py-1 rounded-full border border-neonCyan/30">Target: 75kg</span>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weightData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="week" stroke="rgba(255,255,255,0.5)" tick={{ fontFamily: 'Space Grotesk', fontSize: 12 }} />
                                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="rgba(255,255,255,0.5)" tick={{ fontFamily: 'Space Grotesk', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(0,243,255,0.3)', backdropFilter: 'blur(10px)' }}
                                        itemStyle={{ color: '#00f3ff', fontFamily: 'Space Grotesk' }}
                                    />
                                    <Bar dataKey="weight" radius={[4, 4, 0, 0]}>
                                        {weightData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === weightData.length - 1 ? '#00f3ff' : 'rgba(0,243,255,0.3)'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* Goals & Next Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card p-8 border-neonPurple/30 bg-gradient-to-r from-neonPurple/5 to-transparent relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <h3 className="text-3xl font-display text-white mb-2">NEXT PROTOCOL: HYPERTROPHY STAGE 2</h3>
                            <p className="text-grayMeta font-body font-light">Your assigned Personal Trainer recommends increasing caloric intake by 15% and focusing on compound lifts. Ready to initiate?</p>
                        </div>
                        <button className="btn-neon whitespace-nowrap min-w-[200px]">
                            <span className="btn-neon-text text-sm">Review with PT</span>
                        </button>
                    </div>
                    {/* Decorative Background Icon */}
                    <FaDumbbell className="absolute -right-10 -bottom-10 text-[10rem] text-neonPurple/10 -rotate-12 pointer-events-none" />
                </motion.div>

            </motion.div>
        </section>
    );
};

export default Dashboard;
