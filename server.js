const fs = require('fs');
const express = require('express');
const path = require('path');
const { parse } = require('path/posix');
const { Console } = require('console');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseNotes = JSON.parse(dataNotes);
    res.json(parseNotes);
});

app.post('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseNotes = JSON.parse(dataNotes);
    parseNotes.push(req.body);

fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parseNotes), "utf-8");
res.json("Congrats you have successfully added a note!");
});

app.get ('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.delete("/api/notes/:id", function (req, res) {
    console.log("Req.params:", req.params);
    let deletedNote = parseInt(req.params.id);
    console.log(deletedNote);

    for (let i = 0; i < dbJson.length; i++) {
        if (deletedNote === dbJson[i].id) {
            dbJson.splice(i, 1);

            let noteJson = JSON.stringify(dbJson, null, 2);
            console.log(noteJson);
            fs.writeFile("./db/db.jsopn", noteJson, function (err) {
                if (err) throw err;
                console.log("Your note has been deleted!");
                res.json(dbJson);
            });
        }
    }
});

app.listen(PORT, () => {
    Console.log(`API server now on port ${PORT}!`);
});