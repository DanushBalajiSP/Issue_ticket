# Ubuntu Setup Guide - Support Ticket System

This guide will help you set up the Support Ticket System on a laptop running **Ubuntu Linux**.

## 1. Install Node.js
Open your terminal (`Ctrl+Alt+T`) and run these commands to install Node.js:

```bash
# Update package list
sudo apt update

# Install Node.js (v20 Recommended)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v
```

## 2. Install MongoDB (Database)
You need the database software running on your laptop.

```bash
# Import Public Key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Create List File
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Reload Local Package Database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable it to start on boot (Optional)
sudo systemctl enable mongod
```

## 3. Setup the Project

1.  **Copy Files**: Copy your project folder from Windows to Ubuntu (using a USB stick or GitHub).
2.  **Open Terminal**: Go into the project folder.
    ```bash
    cd /path/to/Issue_ticket
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    ```
4.  **Start the Server**:
    ```bash
    npm run dev
    ```

## 4. Accessing from Windows (Optional)
If you want to access this Ubuntu server from your Windows laptop:
1.  Find Ubuntu's IP address:
    ```bash
    hostname -I
    ```
2.  On Windows, open Chrome and visit: `http://<UBUNTU_IP>:5000`
