const fs = require('fs');

const randomNumber = Math.random().toString();

fs.writeFile('random.txt', randomNumber + '\n', 'utf-8', error => {
  if (error) {
    throw error;
  }
});
