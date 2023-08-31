const { categorias } = require('../models');

const getAll = async (_req, res) => {
  try {
    const [data] = await categorias.selectAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
};