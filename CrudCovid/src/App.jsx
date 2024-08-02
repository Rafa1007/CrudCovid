// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContagiosList from './components/ContagiosList';
import Home from './components/Home';
import AuthContainer from './components/componentsjsx/Login/AuthContainer';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            {/* Show Header and Footer only if authenticated */}
            {isAuthenticated && <Header />}
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/home" replace />
                        ) : (
                            <AuthContainer onLoginSuccess={handleLoginSuccess} />
                        )
                    }
                />
                <Route
                    path="/home"
                    element={isAuthenticated ? <Home /> : <Navigate to="/" replace />}
                />
                <Route
                    path="/contagios"
                    element={isAuthenticated ? <ContagiosList /> : <Navigate to="/" replace />}
                />
            </Routes>
            {isAuthenticated && <Footer />}
        </Router>
    );
};

export default App;
