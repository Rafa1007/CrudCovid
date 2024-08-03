import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({ onToggle, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                username,
                password,
            });
            console.log(response.data);
            onLoginSuccess(); // Notify success
        } catch (error) {
            setError('Login failed: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign In</button>
            </form>
            <p>
                Don't have an account? <button onClick={onToggle}>Sign Up</button>
            </p>
        </div>
    );
};

export default SignIn;
