import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaDumbbell, FaChartLine, FaServer, FaUserSlash, FaUserShield, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Admin = () => {
    const { user } = useAuth();

    // In a real application, you'd check for a specific admin flag, e.g., user?.role === 'admin'
    // For now, if there's no user or it's a guest, redirect to home.
    if (!user || user.isGuest) {
        return <Navigate to="/" replace />;
    }

    // Mock Data for the Admin Dashboard
    const stats = [
        { label: "Active Operatives", value: "1,248", icon: <FaUsers />, color: "text-neonCyan", bg: "bg-neonCyan/10 border-neonCyan/30" },
        { label: "System Load", value: "84%", icon: <FaServer />, color: "text-neonPurple", bg: "bg-neonPurple/10 border-neonPurple/30" },
        { label: "Revenue Cycle", value: "324k", icon: <FaChartLine />, color: "text-neonPink", bg: "bg-neonPink/10 border-neonPink/30" }
    ];

    const targetUsers = [
        { id: "OP-449", name: "ALEX CHEN", status: "Active", plan: "Annual Cyber", lastSeen: "2 mins ago" },
        { id: "OP-102", name: "SARAH VIPER", status: "Suspended", plan: "Basic", lastSeen: "5 days ago" },
        { id: "OP-889", name: "MARCUS NEO", status: "Active", plan: "6-Month Grid", lastSeen: "1 hour ago" },
        { id: "OP-001", name: "ADMIN PRECURSOR", status: "System", plan: "Infinite", lastSeen: "Online" },
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="min-h-screen pt-28 pb-20 px-6 relative z-10 max-w-7xl mx-auto">
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonPink/5 blur-[150px] rounded-full pointer-events-none" />

            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="relative z-10">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2 text-neonPink">
                            <FaUserShield className="text-2xl animate-pulse" />
                            <span className="font-body uppercase tracking-[0.3em] text-xs">Command Center Authorization Confirmed</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display tracking-widest text-white">
                            ADMIN <span className="text-gradient drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">OVERSEER</span>
                        </h1>
                    </div>
                </div>

                {/* KPI/Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`glass-card p-6 border ${stat.bg} flex items-center justify-between group`}
                        >
                            <div>
                                <p className="text-grayMeta uppercase tracking-widest font-body text-xs mb-2">{stat.label}</p>
                                <h3 className={`text-4xl font-display ${stat.color} drop-shadow-lg`}>{stat.value}</h3>
                            </div>
                            <div className={`text-5xl ${stat.color} opacity-50 group-hover:scale-110 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300`}>
                                {stat.icon}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Database Table Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-0 overflow-hidden border-white/10"
                >
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                        <h2 className="text-2xl font-display text-white tracking-widest flex items-center gap-3">
                            <FaServer className="text-neonCyan" /> OPERATIVE DATABASE
                        </h2>
                        <button className="text-xs uppercase tracking-widest font-body text-grayMeta hover:text-white transition-colors bg-white/5 px-4 py-2 rounded border border-white/10 hover:border-white/30">
                            Sync Database
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-body text-sm">
                            <thead className="bg-black/60 text-grayMeta uppercase tracking-widest text-xs border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4">ID Code</th>
                                    <th className="px-6 py-4">Designation</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Plan Level</th>
                                    <th className="px-6 py-4">Last Sync</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {targetUsers.map((user, idx) => (
                                    <motion.tr
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + (idx * 0.1) }}
                                        key={user.id}
                                        className="hover:bg-white/5 transition-colors group"
                                    >
                                        <td className="px-6 py-4 text-neonCyan font-mono">{user.id}</td>
                                        <td className="px-6 py-4 text-white font-bold tracking-wide">{user.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest ${user.status === 'Active' ? 'bg-neonCyan/20 text-neonCyan border border-neonCyan/50' :
                                                    user.status === 'System' ? 'bg-neonPurple/20 text-neonPurple border border-neonPurple/50' :
                                                        'bg-neonPink/20 text-neonPink border border-neonPink/50'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-grayMeta">{user.plan}</td>
                                        <td className="px-6 py-4 text-grayMeta/70">{user.lastSeen}</td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            {user.status !== 'System' && (
                                                <>
                                                    <button className="text-grayMeta hover:text-white transition-colors p-2 rounded hover:bg-white/10" title="Modify Plan">
                                                        <FaDumbbell />
                                                    </button>
                                                    <button className="text-grayMeta hover:text-neonPink transition-colors p-2 rounded hover:bg-neonPink/20" title="Suspend User">
                                                        <FaUserSlash />
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                <div className="mt-8 p-4 bg-neonPink/10 border border-neonPink/30 rounded flex items-center gap-4 text-neonPink/80 text-sm font-body">
                    <FaExclamationTriangle className="text-2xl flex-shrink-0" />
                    <p>WARNING: Admin actions directly affect operational live data in <code className="bg-black/50 px-2 py-1 rounded text-white font-mono mx-1">phgymdb</code>. Exercise extreme caution.</p>
                </div>

            </motion.div>
        </section>
    );
};

export default Admin;
