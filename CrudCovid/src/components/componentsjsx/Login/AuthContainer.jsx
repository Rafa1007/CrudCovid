import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './LoginStyle.css';

const AuthContainer = ({ onLoginSuccess }) => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className="container">
            <div className="background-box"></div> {/* Cuadro de fondo */}
            <div className="box auth-form-container">
                {isSignIn ? (
                    <SignIn onToggle={toggleForm} onLoginSuccess={onLoginSuccess} />
                ) : (
                    <SignUp onToggle={toggleForm} />
                )}
            </div>
        </div>
    );
};

export default AuthContainer;
