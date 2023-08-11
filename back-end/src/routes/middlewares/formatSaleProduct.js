const mapCashier = require('../../utils/map_sales');

const formatSaleProduct = (req, _res, next) => {
    const { cashier } = req.body;
    const mapedCashier = mapCashier(cashier);

    req.body = mapedCashier;

    next();
  };
  
  module.exports = formatSaleProduct;

  // const arr = [
  //   {
  //     id: 1,
  //     nome: 'PAO FRANCES',
  //     preco: 13.9,
  //     unidade: 'UN',
  //     estoque: 5000000,
  //     categoria: 'Pães',
  //     fornecedor: 'Fornecedor A',
  //     quantidade: 2,
  //   },
  //   {
  //     id: 6,
  //     nome: 'BOLO DE CENOURA',
  //     preco: 10,
  //     unidade: 'UN',
  //     estoque: 20,
  //     categoria: 'Bolos',
  //     fornecedor: 'Fornecedor C',
  //     quantidade: 1,
  //   },
  // ];

  // console.log(arr.map((sale) => [sale.id]));