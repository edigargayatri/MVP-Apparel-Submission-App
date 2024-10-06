const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    apparelType: { type: String, required: true },
    condition: { type: String, required: true },
    disposalMethod: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);