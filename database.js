const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

async function initDb() {
    const db = await openDb();
    await db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT NOT NULL,
      issue TEXT NOT NULL,
      status TEXT DEFAULT 'Open',
      response TEXT,
      created_at INTEGER DEFAULT (cast(strftime('%s','now') as int))
    )
  `);
    console.log('Connected to SQLite database and initialized tables.');
    return db;
}

module.exports = { openDb, initDb };
