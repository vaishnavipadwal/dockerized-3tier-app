const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 5000;

const db = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'rootpassword',
  database: 'testdb'
});

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
