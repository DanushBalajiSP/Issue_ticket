# Support Ticket System

A simple Issue Tracking System built with Node.js and MongoDB.

## Requirements
*   **Node.js**: [Download](https://nodejs.org/)
*   **MongoDB**: [Download Community Server](https://www.mongodb.com/try/download/community) (Required for local database)

## Quick Start (Windows)
1.  **Install Prerequisites**: Ensure Node.js and MongoDB are installed and running.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start Server**:
    ```bash
    npm run dev
    ```
4.  **Open App**: Double-click `index.html` or visit `http://localhost:5000`.

## Running on Ubuntu
See [Ubuntu_Setup.md](./Ubuntu_Setup.md) for detailed instructions.

## Database
The project now uses **MongoDB**. You must have a running MongoDB instance.
*   The connection string is configured in `.env`: `MONGODB_URI=mongodb://127.0.0.1:27017/issue_ticket`
