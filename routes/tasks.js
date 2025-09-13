const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { board_id, title, description, status } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (board_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [board_id, title, description, status]
  );
  res.json(result.rows[0]);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { board_id, title, description, status } = req.body;
  const result = await pool.query(
    'UPDATE tasks SET board_id = $1, title = $2, description = $3, status = $4 WHERE id = $5 RETURNING *',
    [board_id, title, description, status, id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;
