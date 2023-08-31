const express = require('express');

const { 
  selectAll, 
  insertSupplier, 
  deleteSupplier, 
  updateSupplier,
 } = require('../models/fornecedores_sql');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [data] = await selectAll();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;

  try {
  await insertSupplier(data);
  res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
  await deleteSupplier(id);
  res.sendStatus(204);
} catch (error) {
  res.status(500).json({ message: error.message });
}
});

router.put('/:id', async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    await updateSupplier(data, Number(id));
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;