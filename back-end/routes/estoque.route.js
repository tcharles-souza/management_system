/* eslint-disable camelcase */
const express = require('express');

const { 
  selectAll, 
  insertProduct, 
  deleteProduct, 
  updateProduct } = require('../models/estoque_sql');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [data] = await selectAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    await insertProduct(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProduct(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', async (req, res) => {
  const data = req.body;
  try {
    await updateProduct(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
