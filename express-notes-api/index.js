const express = require('express');
const notesObject = require('./data.json');
const fs = require('fs');
const app = express();
app.listen(3000);
const jsonParser = express.json();
app.use(jsonParser);

app.get('/api/notes', (req, res) => {
  const notesArray = [];
  for (const note in notesObject.notes) {
    notesArray.push(notesObject.notes[note]);
  }
  res.status(200).json(notesArray);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  if (parseInt(id) < 0 || isNaN(id)) {
    res.status(400).json({ error: 'id must be a positive integer' });
  } else if (notesObject.notes[id]) {
    res.status(200).json(notesObject.notes[id]);
  } else if (!notesObject.notes[id]) {
    res.status(404).json({ error: `cannot find note with id ${id}` });
  }
});

app.post('/api/notes', (req, res) => {
  if (req.body.content === undefined) {
    res.status(400).json({ error: 'content is a required field' });
  } else if (req.body.content !== undefined) {
    notesObject.notes[notesObject.nextId] = req.body;
    notesObject.notes[notesObject.nextId].id = notesObject.nextId;
    notesObject.nextId++;
    const stringifiedNotesObject = JSON.stringify(notesObject);
    fs.writeFile('data.json', stringifiedNotesObject, 'utf-8', err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
      res.status(201).json(notesObject.notes[notesObject.nextId - 1]);
    });
  }
});
