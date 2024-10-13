const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL client setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'perndb',
    password: 'password',
    port: 5432,
});

// CRUD operations

// Create
app.post('/items', async (req, res) => {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO items(name) VALUES($1) RETURNING *', [name]);
    res.json(result.rows[0]);
});

// Read
app.get('/items', async (req, res) => {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
});

// Update
app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query('UPDATE items SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    res.json(result.rows[0]);
});

// Delete
app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

