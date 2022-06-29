const fs = require('fs');

fs.readFile('data.json', 'utf-8', (err, data) => {
  if (err) throw err;
  const jsonData = JSON.parse(data);
  for (const note in jsonData.notes) {
    console.log(`${note}: ${jsonData.notes[note]}`);
  }
});
