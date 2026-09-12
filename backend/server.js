const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("ganesh.db");

app.use(cors());
app.use(express.json());

db.prepare(`
    CREATE TABLE IF NOT EXISTS devotees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
`).run();

// POST API
app.post("/api/devotees", (req, res) => {
    const { name } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).end();
    }

    const insert = db.prepare(`
        INSERT INTO devotees (name)
        VALUES (?)
    `);

    insert.run(name.trim());

    res.status(201).end();   
});

// GET API
app.get("/api/devotees", (req, res) => {
    const devotees = db.prepare("SELECT * FROM devotees").all();
    res.json(devotees);
});

app.listen(5050, () => {
    console.log("Server running on http://localhost:5050");
});