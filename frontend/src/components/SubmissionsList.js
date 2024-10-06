// src/components/SubmissionsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubmissionsList = () => {
    const [submissions, setSubmissions] = useState([]);

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/submissions');
            setSubmissions(response.data);
        } catch (error) {
            console.error(error.response.data);
            alert('Failed to fetch submissions');
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    return (
        <div>
            <h2>Submissions List</h2>
            {submissions.length === 0 ? (
                <p>No submissions yet.</p>
            ) : (
                <ul>
                    {submissions.map((submission) => (
                        <li key={submission._id}>
                            <strong>Apparel Type:</strong> {submission.apparelType} | 
                            <strong> Condition:</strong> {submission.condition} | 
                            <strong> Disposal Method:</strong> {submission.disposalMethod} | 
                            <strong> Submitted by:</strong> {submission.userId.username}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubmissionsList;
