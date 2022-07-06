const fs = require('fs');

const numArgs = process.argv.length;

let currentArg = 2;

const printText = file => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
    currentArg++;
    if (currentArg < numArgs) {
      printText(process.argv[currentArg]);
    }
  });
};

printText(process.argv[currentArg]);
