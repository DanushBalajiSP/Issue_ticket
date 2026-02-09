const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

const TicketSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Open'
    },
    response: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Create model. Note: 'Ticket' will map to 'tickets' collection in MongoDB
const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = { connectDB, Ticket };
