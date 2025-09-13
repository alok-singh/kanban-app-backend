const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM boards');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  const result = await pool.query('INSERT INTO boards (title) VALUES ($1) RETURNING *', [title]);
  res.json(result.rows[0]);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const result = await pool.query('UPDATE boards SET title = $1 WHERE id = $2 RETURNING *', [title, id]);
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM boards WHERE id = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;
