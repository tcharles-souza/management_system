const { fornecedores } = require('../models');

const getAll = async (_req, res) => {
  try {
    const [data] = await fornecedores.selectAll();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
const create = async (req, res) => {
  const data = req.body;

  try {
  await fornecedores.insertSupplier(data);
  res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
const remove = async (req, res) => {
  const { id } = req.params;

  try {
  await fornecedores.deleteSupplier(id);
  res.sendStatus(204);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};
  
const update = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    await fornecedores.updateSupplier(data, Number(id));
    res.sendStatus(204);
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