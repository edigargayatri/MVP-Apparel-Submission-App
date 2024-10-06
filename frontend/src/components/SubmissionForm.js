// src/components/SubmissionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SubmissionForm = ({ history }) => {
    const [apparelType, setApparelType] = useState('');
    const [condition, setCondition] = useState('');
    const [disposalMethod, setDisposalMethod] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to submit.');
            history.push('/login');
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/submissions',
                { apparelType, condition, disposalMethod },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Submission successful');
            setApparelType('');
            setCondition('');
            setDisposalMethod('');
        } catch (error) {
            console.error(error.response.data);
            alert(error.response.data.message || 'Submission failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit Apparel</h2>
            <div>
                <label>Apparel Type:</label>
                <input 
                    type="text" 
                    value={apparelType}
                    onChange={(e) => setApparelType(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Condition:</label>
                <input 
                    type="text" 
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Disposal Method:</label>
                <input 
                    type="text" 
                    value={disposalMethod}
                    onChange={(e) => setDisposalMethod(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default SubmissionForm;
