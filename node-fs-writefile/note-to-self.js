const fs = require('fs');

const userInput = process.argv[2];

fs.writeFile('note.txt', userInput + '\n', 'utf-8', error => {
  if (error) throw error;
});
