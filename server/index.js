const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' :
    process.env.NODE_ENV === 'development' ? '.env.development' :
        '.env.local';

dotenv.config({ path: envFile });

// PostgreSQL client setup using environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// CRUD operations

// Create
app.post('/api/items', async (req, res) => {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO items(name) VALUES($1) RETURNING *', [name]);
    res.json(result.rows[0]);
});

// Read
app.get('/api/items', async (req, res) => {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
});

// Update
app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query('UPDATE items SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    res.json(result.rows[0]);
});

// Delete
app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

