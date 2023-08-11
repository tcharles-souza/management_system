const express = require('express');

const cors = require('cors');

const app = express();

const clientesRoute = require('./routes/clientes');
const estoqueRoute = require('./routes/estoque');
const categoriasRoute = require('./routes/categorias');
const fornecedoresRoute = require('./routes/fornecedores');
const registerRoute = require('./routes/register');
const authentication = require('./routes/authentication');
const finishSale = require('./routes/finishSale');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Working!');
});

app.get('/', (_req, res) => {
  res.sendStatus(200);
});

app.use('/authentication', authentication);
app.use('/clientes', clientesRoute);
app.use('/estoque', estoqueRoute);
app.use('/categorias', categoriasRoute);
app.use('/fornecedores', fornecedoresRoute);
app.use('/register', registerRoute);
app.use('/vendas', finishSale);

module.exports = app;