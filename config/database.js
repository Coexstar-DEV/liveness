const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_database',
  password: 'admin',
  port: 5432,
});

// API endpoint to handle form data insertion
app.post('/insertFormData', (req, res) => {
  const { email, video } = req.body;

  // Validate and sanitize data before insertion

  // Insert data into the database
  pool.query(
    [email, video],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error inserting data' });
        return;
      }
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});