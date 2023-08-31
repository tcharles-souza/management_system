const express = require('express');

const route = express.Router();

const formatSale = require('../controllers/formatSaleData');
const formatSaleProduct = require('../controllers/formatSaleProduct');

const { vendasController } = require('../controllers');

route.post('/', formatSale, vendasController.create);

route.post('/:idVenda', formatSaleProduct, vendasController.createSaleProduct);

route.get('/', vendasController.getAll);

route.get('/:id', vendasController.getAllSaleProducts);

module.exports = route;