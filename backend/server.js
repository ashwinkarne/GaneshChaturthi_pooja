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
    const devotees = db
        .prepare(`
            SELECT * FROM devotees
            ORDER BY id DESC
        `)
        .all();

    res.json(devotees);
});

app.get("/api/devotees/count", (req, res) => {
    const result = db
        .prepare(`
            SELECT COUNT(*) AS count
            FROM devotees
        `)
        .get();

    res.json({
        count: result.count
    });
});

db.prepare(`
    CREATE TABLE IF NOT EXISTS Feedbacks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        feedback TEXT NOT NULL
    )
`).run();


app.post("/api/feedback", (req, res) => {
    const { name, feedback } = req.body;

    if (!name || !feedback) {
        return res.status(400).json({
            error: "Name and feedback are required"
        });
    }

    db.prepare(`
        INSERT INTO Feedbacks (name, feedback)
        VALUES (?, ?)
    `).run(name, feedback);

    res.status(201).json({
        message: "Feedback submitted successfully"
    });
});

app.get("/api/feedback", (req, res) => {
    const feedbacks = db.prepare(`
        SELECT * FROM Feedbacks
        ORDER BY id DESC
    `).all();

    res.json(feedbacks);
});

app.listen(5050, () => {
    console.log("Server running on http://localhost:5050");
});