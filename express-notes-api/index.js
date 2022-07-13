const express = require('express');
const notesObject = require('./data.json');
const fs = require('fs');
const app = express();
app.use(express.json());
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});

app.get('/api/notes', (req, res) => {
  const notesArray = [];
  for (const note in notesObject.notes) {
    notesArray.push(notesObject.notes[note]);
  }
  res.status(200).json(notesArray);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  if (parseInt(id) <= 0 || isNaN(id)) {
    res.status(400).json({ error: 'id must be a positive integer' });
  } else if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'id must be a positive integer' });
  } else if (notesObject.notes[id]) {
    res.status(200).json(notesObject.notes[id]);
  } else {
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
      } else {
        res.status(201).json(notesObject.notes[notesObject.nextId - 1]);
      }
    });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  if (parseInt(id) <= 0 || isNaN(id)) {
    res.status(400).json({ error: 'id must be a positive integer' });
  } else if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'id must be a positive integer' });
  } else if (!notesObject.notes[id]) {
    res.status(404).json({ error: `Cannot find note with id ${id}` });
  } else if (notesObject.notes[id]) {
    delete notesObject.notes[id];
    const stringifiedNotesObject = JSON.stringify(notesObject);
    fs.writeFile('data.json', stringifiedNotesObject, 'utf-8', err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred' });
      } else {
        res.status(204).send();
      }
    });
  }
});

app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  if (parseInt(id) <= 0 || isNaN(id)) {
    res.status(400).json({ error: 'id must be a positive integer' });
  } else if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'id must be a positive integer' });
  } else if (req.body.content === undefined) {
    res.status(400).json({ error: 'content is a required field' });
  } else if (!notesObject.notes[id]) {
    res.status(404).json({ error: `Cannot find note with id ${id}` });
  } else if (req.body.content !== undefined) {
    for (const note in notesObject.notes) {
      if (parseInt(id) === notesObject.notes[note].id) {
        notesObject.notes[note].content = req.body.content;
        const stringifiedNotesObject = JSON.stringify(notesObject);
        fs.writeFile('data.json', stringifiedNotesObject, 'utf-8', err => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'An unexpected error has occurred' });
          } else {
            res.status(200).json(notesObject.notes[note]);
          }
        });
      }
    }
  }
});
