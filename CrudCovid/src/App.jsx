// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContagiosList from './components/ContagiosList';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contagios" element={<ContagiosList />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
