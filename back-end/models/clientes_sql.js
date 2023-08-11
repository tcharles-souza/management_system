const conn = require('../config/connection');

const selectAll = () => conn.execute('SELECT * FROM clientes');

const insertCustomer = ({ nome, sobrenome, endereco, telefone, status }) => conn.execute(
  `INSERT INTO PadariaDB.clientes (nome, sobrenome, endereco, telefone, status)
  VALUES (?, ?, ?, ?, ?);`,
  [nome, sobrenome, endereco, telefone, status],
);

const deleteCustomer = (id) => conn.execute(
  'DELETE FROM clientes WHERE (id = ?)',
  [id],
);

const updateCustomer = ({ nome, sobrenome, endereco, telefone, status, id }) => conn.execute(
  `UPDATE clientes 
  SET 
    nome = ?,
    sobrenome = ?,
    endereco = ?,
    telefone = ?,
    status = ?
  WHERE (id = ?)`,
[nome, sobrenome, endereco, telefone, status, id],
);

module.exports = {
  selectAll,
  insertCustomer,
  deleteCustomer,
  updateCustomer,
};
