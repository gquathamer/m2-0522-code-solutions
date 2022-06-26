const fs = require('fs');
const fileInput = process.argv[2];
fs.readFile(fileInput, 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
