const app = require('./app');

const { 
  clientesRoute, 
  estoqueRoute, 
  categoriasRoute, 
  fornecedoresRoute,
  usuariosRoute,
  vendasRoute,
  autenticacaoRoute,
} = require('./routes');

app.get('/', (_req, res) => {
  res.sendStatus(200);
});

app.use('/clientes', clientesRoute);
app.use('/estoque', estoqueRoute);
app.use('/categorias', categoriasRoute);
app.use('/fornecedores', fornecedoresRoute);
app.use('/register', usuariosRoute);
app.use('/authentication', autenticacaoRoute);
app.use('/vendas', vendasRoute);

module.exports = app;
