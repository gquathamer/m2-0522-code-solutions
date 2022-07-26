// eslint-disable-next-line no-unused-vars
const { Pool, Client } = require('pg');
const express = require('express');
const app = express();

// only create ONE pool for your whole server
const db = new Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});

app.use(express.json());

app.get('/api/grades', (req, res) => {
  db.query('SELECT * FROM "grades"')
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => {
      console.error(err.stack);
      res.status(500).json({
        error: 'sorry but an unexpected error occurred'
      });
    });
});
