const express = require('express');

const route = express.Router();

const formatSale = require('../controllers/formatSaleData');
const formatSaleProduct = require('../controllers/formatSaleProduct');
const { 
    insertSale, 
    insertProductSale, 
    selectAllSales, 
    selectSaleProduct } = require('../models/venda_sql');

route.post('/', formatSale, async (req, res) => {
try {
   const [data] = await insertSale(req.body);
   const { insertId } = data;

   res.status(201).json({ insertId });
} catch (error) {
    res.sendStatus(500);
}
});

route.post('/:idVenda', formatSaleProduct, async (req, res) => {
    const { idVenda } = req.params;
    const data = req.body;

    await insertProductSale({ data, idVenda });
    res.sendStatus(200);
});

route.get('/', async (_req, res) => {
  try {
    const [data] = await selectAllSales();
    res.status(200).json(data);    
  } catch (error) {
    res.sendStatus(500);
  }
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await selectSaleProduct(Number(id));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = route;