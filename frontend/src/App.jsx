import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Classes from './pages/Classes';
import About from './pages/About';
import Plans from './pages/Plans';
import Location from './pages/Location';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Trainers from './pages/Trainers';
import Chat from './pages/Chat';
import VideoTrial from './pages/VideoTrial';

const App = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="classes" element={<Classes />} />
        <Route path="about" element={<About />} />
        <Route path="plans" element={<Plans />} />
        <Route path="location" element={<Location />} />
        <Route path="contact" element={<Contact />} />
        <Route path="auth" element={<Auth />} />
        <Route path="admin" element={<Admin />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="trainers" element={<Trainers />} />
        <Route path="chat" element={<Chat />} />
        <Route path="video" element={<VideoTrial />} />
      </Route>
    </Routes>
  );
};

export default App;
