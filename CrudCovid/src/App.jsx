// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContagiosList from './components/ContagiosList';
import Home from './components/Home';
import AuthContainer from './components/componentsjsx/Login/AuthContainer';
import HospitalizadosList from './components/componentsjsx/Hospitalizados/HospitalizadosList';
import RecuperadosList from './components/componentsjsx/Recuperados/RecuperadosList'; // Asegúrate de que la ruta sea correcta

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    const handleLoginSuccess = (user) => {
        setIsAuthenticated(true);
        setUsername(user.username);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername('');
    };

    return (
        <Router>
            {isAuthenticated && <Header username={username} onLogout={handleLogout} />}
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
                <Route 
                    path="/hospitalizados"
                    element={isAuthenticated ? <HospitalizadosList/> : <Navigate to="/" replace />}
                />
                <Route
                    path="/recuperados"
                    element={isAuthenticated ? <RecuperadosList /> : <Navigate to="/" replace />}
                />
                {/* Agrega las demás rutas aquí */}
            </Routes>
            {isAuthenticated && <Footer />}
        </Router>
    );
};

export default App;
