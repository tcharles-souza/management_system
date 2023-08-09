const express = require('express');

const { selectAll } = require('../db/queries/categorias_sql');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [data] = await selectAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;