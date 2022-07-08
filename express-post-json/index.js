const express = require('express');
const app = express();
app.listen(3000);
let nextId = 1;
const grades = {};
app.get('/api/grades', (req, res) => {
  const gradesArray = [];
  for (const grade in grades) {
    gradesArray.push(grades[grade]);
  }
  res.json(gradesArray);
});
const jsonParsingMiddleware = express.json();
app.use(jsonParsingMiddleware);
app.post('/api/grades', (req, res) => {
  req.body.id = nextId;
  grades[nextId] = req.body;
  res.status(201).send(req.body);
  nextId++;
});
