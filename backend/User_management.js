const express = require("express");
const app = express();

const Database = require("better-sqlite3");
const db = new Database("employee_list");

app.use(express.json())
/*Creating Database */
db.prepare(`CREATE TABLE IF NOT EXISTS Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT ,
    Name TEXT NOT NULL)`).run();


app.get("/",(req,res)=>{
    res.send("Server started")
})

/*Adding username in database*/

app.post("/addUser",(req,res)=>{
    const { name } = req.body;
    db.prepare("INSERT INTO Users (Name) VALUES (?)").run(name);
    res.send("User added successfully");
})

/*Getting all users from database*/
app.get("/getUsers",(req,res)=>{
    const users = db.prepare("SELECT * FROM Users").all();
    res.json(users);
})

app.listen(5050,()=>{
    console.log("Server started on port 5050");
})