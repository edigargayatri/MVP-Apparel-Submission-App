// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate(); // Initialize navigate
    const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token on logout
        navigate('/'); // Redirect to home after logout
    };

    return (
        <nav>
            <ul className="navbar">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!isAuthenticated && ( // Show Login and Register only if not authenticated
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
                {isAuthenticated && ( // Show Submissions link only if authenticated
                    <>
                        <li>
                            <Link to="/submissions"> View Submissions</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={handleLogout}>Logout</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
