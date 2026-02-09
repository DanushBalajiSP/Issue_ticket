const form = document.getElementById('ticketForm');
const list = document.getElementById('ticketList');
const toggleBtn = document.getElementById('modeToggle');
const formSection = document.getElementById('formSection');

const API_URL = 'http://localhost:5000/tickets';
let tickets = [];
let isAdmin = false;

// Toggle Admin Mode
toggleBtn.addEventListener('click', () => {
    isAdmin = !isAdmin;
    toggleBtn.textContent = isAdmin ? 'Switch to User Mode' : 'Switch to Admin Mode';
    formSection.style.display = isAdmin ? 'none' : 'block';
    renderTickets();
});

// Fetch Tickets from API
// Gets the current list of tickets from the backend and updates the UI
async function fetchTickets() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch tickets');
        tickets = await res.json();
        renderTickets();
    } catch (err) {
        console.error(err);
        list.innerHTML = '<p class="error">Error loading tickets. Is the server running?</p>';
    }
}

// Render Tickets
function renderTickets() {
    list.innerHTML = tickets.length ? '' : '<p>No tickets yet.</p>';
    tickets.forEach((t) => {
        const div = document.createElement('div');
        div.className = 'ticket';

        // MongoDB uses _id, SQLite uses id. Handle both.
        const ticketId = t._id || t.id;

        let adminControls = '';
        if (isAdmin) {
            adminControls = `
            <div class="admin-actions">
                <input type="text" id="resp-${ticketId}" placeholder="Admin response" value="${t.response || ''}">
                <button onclick="resolveByAdmin('${ticketId}')">Resolve/Update</button>
            </div>`;
        }

        div.innerHTML = `
            <button class="delete-btn" onclick="deleteTicket('${ticketId}')" title="Delete Ticket">X</button>
            <div class="ticket-header">
                <strong>#${ticketId.toString().slice(-4)} - ${t.user}</strong>
                <span class="status ${t.status}">${t.status}</span>
            </div>
            <p>${t.issue}</p>
            ${t.response && !isAdmin ? `<div class="response"><strong>Admin:</strong> ${t.response}</div>` : ''}
            ${adminControls}
        `;
        list.appendChild(div);
    });
}

// Submit New Ticket
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const issue = document.getElementById('issue').value;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, issue })
        });
        if (res.ok) {
            form.reset();
            fetchTickets();
        } else {
            alert('Failed to create ticket');
        }
    } catch (err) {
        console.error(err);
        alert('Error connecting to server');
    }
});

// Delete Ticket
window.deleteTicket = async (id) => {
    if (confirm('Delete this ticket?')) {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (res.ok) fetchTickets();
            else alert('Failed to delete ticket');
        } catch (err) {
            console.error(err);
        }
    }
};

// Resolve/Update Ticket (Admin)
window.resolveByAdmin = async (id) => {
    const input = document.getElementById(`resp-${id}`);
    const response = input.value;
    if (!response) return alert('Please enter a response.');

    try {
        const res = await fetch(`${API_URL}/${id}/resolve`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ response })
        });
        if (res.ok) fetchTickets();
        else alert('Failed to update ticket');
    } catch (err) {
        console.error(err);
    }
};

// Initial Load
fetchTickets();
