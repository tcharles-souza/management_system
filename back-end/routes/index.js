const fornecedoresRoute = require('./fornecedores.route');
const categoriasRoute = require('./categorias.route');
const clientesRoute = require('./clientes.route');
const estoqueRoute = require('./estoque.route');
const usuariosRoute = require('./usuarios.route');
const vendasRoute = require('./vendas.route');
const autenticacaoRoute = require('./autenticacao.route'); 

module.exports = {
  autenticacaoRoute,
  fornecedoresRoute,
  categoriasRoute,
  clientesRoute,
  estoqueRoute,
  usuariosRoute,
  vendasRoute,
};