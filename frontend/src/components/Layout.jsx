import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBot from './ChatBot';

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
};

const Layout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-trueBlack text-white overflow-hidden selection:bg-neonPink selection:text-white relative flex flex-col">
            <div className="fixed inset-0 z-0 bg-grid opacity-20 pointer-events-none" />
            <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neonPurple/20 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-neonPink/20 blur-[150px] pointer-events-none" />

            <Navbar />

            <main className="flex-grow pt-24 relative z-10 w-full mb-auto flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageTransition}
                        className="flex-grow flex flex-col"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            <ChatBot />
            <Footer />
        </div>
    );
};

export default Layout;
