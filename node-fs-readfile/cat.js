const fs = require('fs');
for (let i = 2; i < process.argv.length; i++) {
  fs.readFile(process.argv[i], 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}
