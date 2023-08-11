const express = require('express');

const cors = require('cors');

const app = express();

const clientesRoute = require('./routes/clientesRoute');
const estoqueRoute = require('./routes/estoqueRoute');
const categoriasRoute = require('./routes/categoriasRoute');
const fornecedoresRoute = require('./routes/fornecedoresRoute');
const registerRoute = require('./routes/registerRoute');
const authentication = require('./routes/authenticationRoute');
const finishSale = require('./routes/vendaRoute');

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
app.use('/register', registerRoute);
app.use('/authentication', authentication);
app.use('/vendas', finishSale);

module.exports = app;
