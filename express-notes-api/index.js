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
