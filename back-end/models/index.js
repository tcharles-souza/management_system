const categorias = require('./categorias_sql');
const clientes = require('./clientes_sql');
const estoque = require('./estoque_sql');
const fornecedores = require('./fornecedores_sql');
const usuarios = require('./usuarios_sql');
const vendas = require('./vendas_sql');

module.exports = {
  categorias,
  clientes,
  estoque,
  fornecedores,
  usuarios,
  vendas,
};