import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFire, FaWeight, FaClock, FaHeartbeat, FaCalendarCheck, FaDumbbell, FaArrowRight, FaBolt, FaUserCircle } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

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

const activityData = [
    { name: 'Mon', calories: 2100 },
    { name: 'Tue', calories: 1800 },
    { name: 'Wed', calories: 2400 },
    { name: 'Thu', calories: 2200 },
    { name: 'Fri', calories: 2600 },
    { name: 'Sat', calories: 1900 },
    { name: 'Sun', calories: 2100 },
];

const weightData = [
    { month: 'Jan', weight: 82 },
    { month: 'Feb', weight: 81 },
    { month: 'Mar', weight: 79.5 },
    { month: 'Apr', weight: 78.2 },
    { month: 'May', weight: 77.5 },
];

const StatCard = ({ icon, label, value, unit, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="glass-morphism p-5 rounded-[2rem] relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-30 group-hover:scale-150 ${color}`} />
        <div className="flex items-center gap-4">
            <div className={`p-3.5 rounded-2xl ${color.replace('bg-', 'text-')} bg-white/5 text-xl`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">{label}</p>
                <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl font-display"><CountUp end={value} /></h3>
                    <span className="text-gray-500 text-[10px] font-body uppercase">{unit}</span>
                </div>
            </div>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    if (!user || user.isGuest) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className="px-6 py-6 max-w-7xl mx-auto space-y-8 pb-32">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <FaBolt className="text-neonCyan text-xs animate-pulse" />
                        <p className="text-neonCyan font-display tracking-[0.2em] uppercase text-[10px]">{greeting}</p>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-display tracking-tight">
                        ELITE <span className="text-gradient">OPERATIVE</span>
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:block text-right">
                        <p className="text-white font-display text-sm uppercase tracking-widest">{user.name}</p>
                        <p className="text-neonPink text-[10px] font-bold uppercase tracking-widest">Level 12 Warrior</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-neonCyan p-0.5 shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                        <div className="w-full h-full rounded-full bg-darkGray flex items-center justify-center overflow-hidden">
                            <FaUserCircle className="text-gray-400 text-4xl" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<FaFire />} label="Burn" value={12450} unit="kcal" color="bg-neonPink" delay={0.1} />
                <StatCard icon={<FaWeight />} label="Weight" value={77.5} unit="kg" color="bg-neonCyan" delay={0.2} />
                <StatCard icon={<FaClock />} label="Hours" value={48} unit="hrs" color="bg-neonPurple" delay={0.3} />
                <StatCard icon={<FaHeartbeat />} label="Avg BPM" value={132} unit="bpm" color="bg-red-500" delay={0.4} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Activity Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 glass-morphism p-6 rounded-[2.5rem] relative overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-display mb-0.5 uppercase tracking-wider">Neural Activity</h3>
                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Biometric Output / Week</p>
                        </div>
                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-neonCyan">
                            Syncing...
                        </div>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }} dy={10} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(0,243,255,0.2)', borderRadius: '16px', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                                    itemStyle={{ color: '#00f3ff', fontWeight: 'bold', fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="calories" stroke="#00f3ff" strokeWidth={4} fillOpacity={1} fill="url(#colorCal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Workout of the Day */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="glass-morphism p-6 rounded-[2.5rem] bg-gradient-to-br from-neonPurple/10 to-transparent border-neonPurple/20 flex flex-col justify-between group"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-neonPurple/20 rounded-2xl text-neonPurple shadow-[0_0_15px_rgba(176,38,255,0.2)]">
                                <FaDumbbell className="text-xl" />
                            </div>
                            <span className="text-neonPurple font-display tracking-[0.2em] uppercase text-[10px] font-bold">Today's Protocol</span>
                        </div>
                        <h2 className="text-3xl font-display mb-4 leading-none">HYPER<br /><span className="text-gradient-pink">STRENGTH</span></h2>
                        <div className="space-y-3 mb-6">
                            {[
                                { name: 'Deadlifts', sets: '5x5', color: 'text-neonPink' },
                                { name: 'Bench Press', sets: '4x8', color: 'text-neonCyan' },
                                { name: 'Weighted Pullups', sets: '3x10', color: 'text-neonPurple' },
                            ].map((ex, i) => (
                                <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="text-gray-300 text-xs font-medium uppercase tracking-wider">{ex.name}</span>
                                    <span className={`${ex.color} font-display text-sm tracking-widest`}>{ex.sets}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="w-full bg-white text-black font-display text-lg py-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-neonPurple hover:text-white group shadow-xl">
                        START SESSION <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </motion.div>
            </div>

            {/* Secondary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weight Tracking */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="glass-morphism p-6 rounded-[2.5rem]"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-display uppercase tracking-wider">Mass Trajectory</h3>
                        <span className="text-neonPink text-[10px] font-bold uppercase tracking-widest">-2.5kg this month</span>
                    </div>
                    <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weightData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: '#ffffff05' }}
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,0,153,0.2)', borderRadius: '16px' }}
                                />
                                <Bar dataKey="weight" radius={[8, 8, 0, 0]}>
                                    {weightData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === weightData.length - 1 ? '#ff0099' : 'rgba(255,0,153,0.2)'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Upcoming Schedule */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="glass-morphism p-6 rounded-[2.5rem]"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-display uppercase tracking-wider">Mission Schedule</h3>
                        <FaCalendarCheck className="text-neonCyan text-lg" />
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: 'HIIT Core', time: '18:30', instructor: 'Coach Alex', color: 'border-neonPink', icon: <FaBolt /> },
                            { name: 'Power Yoga', time: 'Tomorrow 09:00', instructor: 'Sarah J.', color: 'border-neonCyan', icon: <FaHeartbeat /> },
                        ].map((item, i) => (
                            <div key={i} className={`p-4 rounded-2xl border-l-4 ${item.color} bg-white/5 flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer border-y border-r border-white/5`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg bg-white/5 ${item.color.replace('border-', 'text-')}`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-display tracking-widest text-sm">{item.name}</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.instructor}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-display text-white tracking-widest">{item.time}</p>
                                    <span className="text-[9px] text-neonCyan font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Engaged</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
