const express = require('express');
const formatSale = require('./middlewares/formatSaleData');
const { insertSale, insertProductSale } = require('../db/queries/venda_sql');
const formatSaleProduct = require('./middlewares/formatSaleProduct');

const route = express.Router();

route.post('/', formatSale, async (req, res) => {
try {
   const [data] = await insertSale(req.body);
   const { insertId } = data;

   res.status(201).json({ insertId });
} catch (error) {
    console.log(error);
    res.sendStatus(500);
}
});

route.post('/:idVenda', formatSaleProduct, async (req, res) => {
    const { idVenda } = req.params;
    const data = req.body;

    await insertProductSale({ data, idVenda });
    res.sendStatus(200);
});

module.exports = route;