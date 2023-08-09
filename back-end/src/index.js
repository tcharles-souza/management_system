const express = require('express');

const cors = require('cors');

const app = express();

const clientesRoute = require('./routes/clientes');
const estoqueRoute = require('./routes/estoque');
const categoriasRoute = require('./routes/categorias');
const fornecedoresRoute = require('./routes/fornecedores');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Working!');
});

app.get('/', (_req, res) => {
  res.sendStatus(200);
});

app.use('/clientes', clientesRoute);
app.use('/estoque', estoqueRoute);
app.use('/categorias', categoriasRoute);
app.use('/fornecedores', fornecedoresRoute);

module.exports = app;