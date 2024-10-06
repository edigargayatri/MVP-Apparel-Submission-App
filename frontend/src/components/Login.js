import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token); // Store the token
            alert('Login successful');
            navigate('/submit'); // Redirect to submission form
        } catch (error) {
            console.error(error.response?.data || 'Login failed');
            alert(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
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
                {loading ? 'Logging in...' : 'Login'} {/* Change button text based on loading state */}
            </button>
        </form>
    );
};

export default Login;
