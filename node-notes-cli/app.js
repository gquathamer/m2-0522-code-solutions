const fs = require('fs');
const jsonData = require('./data.json');
const operation = process.argv[2];

if (operation === 'read') {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) throw err;
    for (const note in jsonData.notes) {
      console.log(`${note}: ${jsonData.notes[note]}`);
    }
  });
} else if (operation === 'create') {
  const newNote = process.argv[3];
  jsonData.notes[jsonData.nextId] = newNote;
  jsonData.nextId++;
  const newJsonData = JSON.stringify(jsonData, null, 2);
  fs.writeFile('data.json', newJsonData, err => {
    if (err) throw err;
  });
} else if (operation === 'delete') {
  const noteId = process.argv[3];
  delete jsonData.notes[noteId];
  const newJsonData = JSON.stringify(jsonData, null, 2);
  fs.writeFile('data.json', newJsonData, err => {
    if (err) throw err;
  });
} else if (operation === 'update') {
  const noteId = process.argv[3];
  const newNote = process.argv[4];
  if (jsonData.notes[noteId]) {
    jsonData.notes[noteId] = newNote;
    const newJsonData = JSON.stringify(jsonData, null, 2);
    fs.writeFile('data.json', newJsonData, err => {
      if (err) throw err;
    });
  } else {
    console.log('invalid note ID');
  }
}
