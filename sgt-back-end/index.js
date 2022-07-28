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
  const sql = `
    SELECT *
    FROM "grades"
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'sorry but an unexpected error occurred'
      });
    });
});

app.post('/api/grades', (req, res) => {
  if (!req.body.score || req.body.score < 0 || req.body.score > 100) {
    res.status(400).json({ error: 'request must include a valid score between 0 and 100' });
    return;
  } else if (!req.body.course) {
    res.status(400).json({ error: 'request must include a course' });
    return;
  } else if (!req.body.name) {
    res.status(400).json({ error: 'request must include a name' });
    return;
  }
  const parameters = [req.body.name, req.body.course, req.body.score];
  const sql = `
    INSERT INTO "graes" ("name", "course", "score")
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  db.query(sql, parameters)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'sorry but an unexpected error occurred' });
    });
});

app.put('/api/grades/:gradeId', (req, res) => {
  const gradeId = Number(req.params.gradeId);
  if (parseInt(gradeId) <= 0 || isNaN(gradeId) || !Number.isInteger(gradeId)) {
    res.status(400).json({ error: 'gradeId must be a positive integer' });
    return;
  } else if (!req.body.score || req.body.score < 0 || req.body.score > 100) {
    res.status(400).json({ error: 'request must include a valid score between 0 and 100' });
    return;
  } else if (!req.body.course) {
    res.status(400).json({ error: 'request must include a course' });
    return;
  } else if (!req.body.name) {
    res.status(400).json({ error: 'request must include a name' });
    return;
  }
  const parameters = [req.body.name, req.body.course, req.body.score, gradeId];
  const sql = `
    UPDATE "grades"
    SET "name" = $1,
      "course" = $2,
      "score" = $3
    WHERE "gradeId" = $4
    RETURNING *
  `;
  db.query(sql, parameters)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({ error: `Cannot find grade with gradeId ${gradeId}` });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'sorry but an unexpected error occurred' });
    });
});

app.delete('/api/grades/:gradeId', (req, res) => {
  const gradeId = Number(req.params.gradeId);
  if (parseInt(gradeId) <= 0 || isNaN(gradeId) || !Number.isInteger(gradeId)) {
    res.status(400).json({ error: 'gradeId must be a positive integer' });
    return;
  }
  const parameters = [gradeId];
  const sql = `
    DELETE FROM "grades"
    WHERE "gradeId" = $1
    RETURNING *
  `;
  db.query(sql, parameters)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({ error: `Cannot find grade with gradeId ${gradeId}` });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'sorry but an unexpected error occurred' });
    });
});
