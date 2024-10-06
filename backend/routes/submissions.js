// routes/submissions.js
const express = require('express');
const Submission = require('../models/Submission');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Create Submission
router.post('/', auth, async (req, res) => {
    const { apparelType, condition, disposalMethod } = req.body;

    try {
        const newSubmission = new Submission({
            userId: req.user,
            apparelType,
            condition,
            disposalMethod,
        });

        const submission = await newSubmission.save();
        res.status(201).json(submission);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Get All Submissions
router.get('/', async (req, res) => {
    try {
        const submissions = await Submission.find().populate('userId', 'username').sort({ createdAt: -1 });
        res.json(submissions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
