const { estoque } = require('../models');

const getAll = async (_req, res) => {
  try {
    const [data] = await estoque.selectAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const data = req.body;
  try {
    await estoque.insertProduct(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await estoque.deleteProduct(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const data = req.body;
  try {
    await estoque.updateProduct(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  create,
  remove,
  update,
};