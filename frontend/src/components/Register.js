import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // Initialize navigate

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            alert('Registration successful');
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error(error.response?.data || 'Registration failed');
            alert(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'} {/* Change button text based on loading state */}
            </button>
        </form>
    );
};

export default Register;
