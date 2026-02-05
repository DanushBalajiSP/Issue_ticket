const express = require('express');
const cors = require('cors');
const { initDb } = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db;

// Initialize Database connection
// This ensures the table exists before the server accepts requests
(async () => {
    try {
        db = await initDb();
        console.log('Database initialized');
    } catch (err) {
        console.error('Failed to initialize database:', err);
    }
})();

// --- API Routes ---

// GET /tickets
// Fetch all tickets, sorted by newest first
app.get('/tickets', async (req, res) => {
    try {
        const tickets = await db.all('SELECT * FROM tickets ORDER BY created_at DESC');
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
        const result = await db.run(
            'INSERT INTO tickets (user, issue) VALUES (?, ?)',
            [user, issue]
        );
        const newTicket = await db.get('SELECT * FROM tickets WHERE id = ?', result.lastID);
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a ticket
app.delete('/tickets/:id', async (req, res) => {
    try {
        await db.run('DELETE FROM tickets WHERE id = ?', req.params.id);
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
        await db.run(
            "UPDATE tickets SET response = ?, status = 'Resolved' WHERE id = ?",
            [response, req.params.id]
        );
        const updatedTicket = await db.get('SELECT * FROM tickets WHERE id = ?', req.params.id);
        res.json(updatedTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
