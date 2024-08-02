// src/components/componentsjsx/Login/AuthContainer.jsx
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
        <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
            <div className="row">
                {isSignIn ? (
                    <SignIn onToggle={toggleForm} onLoginSuccess={onLoginSuccess} />
                ) : (
                    <SignUp onToggle={toggleForm} />
                )}
            </div>
            <div className="row content-row">
                <div className="col align-items-center flex-col">
                    <div className={`text ${isSignIn ? 'sign-in' : 'sign-up'}`}>
                        <h2>
                            {isSignIn ? 'Welcome Back' : 'Join Us Today'}
                        </h2>
                    </div>
                    <div className={`img ${isSignIn ? 'sign-in' : 'sign-up'}`} />
                </div>
            </div>
        </div>
    );
};

export default AuthContainer;
