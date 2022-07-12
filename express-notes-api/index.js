const express = require('express');
const notesObject = require('./data.json');
const app = express();
app.listen(3000);
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
