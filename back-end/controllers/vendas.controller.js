const { vendas } = require('../models');

const create = async (req, res) => {
  try {
    const [data] = await vendas.insertSale(req.body);
    const { insertId } = data;
    res.status(201).json({ insertId });
  } catch (error) {
    res.sendStatus(500);
  }
};

const createSaleProduct = async (req, res) => {
  try {
    const { idVenda } = req.params;
    const data = req.body;

    await vendas.insertProductSale({ data, idVenda });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAll = async (_req, res) => {
  try {
    const [data] = await vendas.selectAllSales();
    res.status(200).json(data);    
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAllSaleProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await vendas.selectSaleProduct(Number(id));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  createSaleProduct,
  getAll,
  getAllSaleProducts,
};