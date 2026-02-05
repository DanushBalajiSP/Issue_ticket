# Support Ticket System - Installation Guide

Follow these steps to run this project on another computer.

## Prerequisites
The other computer must have **Node.js** installed.
1.  Download and install it from: [nodejs.org](https://nodejs.org/)
2.  During installation, checking the box for "Tools for Native Modules" is recommended but usually optional for this project.

## Step-by-Step Setup

### 1. Copy the Project
Copy this entire project folder to the new computer.
> **Note:** You can skip copying the `node_modules` folder to save time (it contains thousands of files). We will reinstall them in the next step.

### 2. Install Dependencies
Open a terminal (Command Prompt or PowerShell) inside the project folder on the new computer and run:
```bash
npm install
```
*This command downloads all the necessary libraries (Express, SQLite, etc.) defined in `package.json`.*

### 3. Start the Server
In the same terminal, run:
```bash
npm run dev
```
You should see: `Server is running on port 5000`

### 4. Run the Application
1.  Keep the terminal window open (this is your server).
2.  Go to the project folder and double-click **`index.html`** to open the app in your browser.

## Important Notes
*   **Database**: The file `database.db` contains your data.
    *   If you **copy** it to the new computer, you keep your old tickets.
    *   If you **delete** it (or don't copy it), the app will create a brand new, empty database when you start the server.
