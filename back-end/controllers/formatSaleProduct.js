const mapCashier = require('./map_sales');

const formatSaleProduct = (req, _res, next) => {
    const { cashier } = req.body;
    const mapedCashier = mapCashier(cashier);

    req.body = mapedCashier;

    next();
  };
  
  module.exports = formatSaleProduct;
