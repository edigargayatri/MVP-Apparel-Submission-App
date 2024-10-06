// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Login from './components/Login';
import Register from './components/Register';
import SubmissionForm from './components/SubmissionForm';
import SubmissionsList from './components/SubmissionsList';
import Navbar from './components/Navbar';
import './styles.css'; 

const App = () => {
    return (
        <Router>
            <Navbar /> {/* Render the Navbar */}
            <div>
                <Routes>
                    <Route path="/" element={<Home />} /> {/* Home Page */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/submit" element={<SubmissionForm />} />
                    <Route path="/submissions" element={<SubmissionsList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
