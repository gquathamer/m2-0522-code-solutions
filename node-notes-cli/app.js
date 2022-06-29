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
    console.log(newJsonData);
  });
}
