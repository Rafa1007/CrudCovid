import React, { useState } from 'react';
import axios from 'axios';
// import './SignUpStyle.css'; // Asegúrate de tener un archivo de estilos adecuado

const SignUp = ({ onToggle }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', {
                first_name: firstName,
                last_name: lastName,
                email,
                username,
                password,
                age: parseInt(age, 10)  // Convertir age a número
            });
            console.log(response.data);
            // Opcional: redirigir al usuario o mostrar un mensaje de éxito
        } catch (error) {
            setError('Registration failed: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <button onClick={onToggle}>Sign In</button>
            </p>
        </div>
    );
};

export default SignUp;
