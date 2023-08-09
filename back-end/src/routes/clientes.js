const express = require('express');
const { selectAll,
  insertCustomer,
  deleteCustomer,
  updateCustomer } = require('../db/queries/clientes_sql');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [data] = await selectAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    await insertCustomer({ ...req.body });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCustomer(Number(id));
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', async (req, res) => {
  const data = req.body;
  try {
    await updateCustomer(data);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
