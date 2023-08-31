const { clientes } = require('../models');

const getAll = async (req, res) => {
  try {
    const [data] = await clientes.selectAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    await clientes.insertCustomer({ ...req.body });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await clientes.deleteCustomer(Number(id));
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const data = req.body;
  try {
    await clientes.updateCustomer(data);
    res.sendStatus(201);
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