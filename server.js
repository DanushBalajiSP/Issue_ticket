const express = require('express');
const cors = require('cors');
const { connectDB, Ticket } = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files (index.html, script.js)

// Initialize Database connection
connectDB();

// --- API Routes ---

// GET /tickets
// Fetch all tickets, sorted by newest first
app.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ created_at: -1 });
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a ticket
app.post('/tickets', async (req, res) => {
    const { user, issue } = req.body;
    if (!user || !issue) {
        return res.status(400).json({ error: 'User and Issue are required' });
    }
    try {
        const newTicket = new Ticket({ user, issue });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a ticket
app.delete('/tickets/:id', async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.json({ message: 'Ticket deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Resolve/Update ticket (Admin)
app.put('/tickets/:id/resolve', async (req, res) => {
    const { response } = req.body;
    if (!response) {
        return res.status(400).json({ error: 'Response is required' });
    }
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { response, status: 'Resolved' },
            { new: true } // Return the updated document
        );
        res.json(updatedTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
