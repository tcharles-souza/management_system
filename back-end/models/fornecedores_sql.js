const conn = require('../config/connection');

const selectAll = () => conn.execute('SELECT * FROM fornecedores');

const insertSupplier = ({ nome, razao_social: rs, cnpj, email, telefone }) => conn.execute(
  `INSERT INTO fornecedores (nome, razao_social, cnpj, email, telefone)
  VALUES (?, ?, ?, ?, ? )`,
  [nome, rs, cnpj, email, telefone],
);

const deleteSupplier = (id) => conn.execute(
  'DELETE FROM fornecedores WHERE (id = ?)',
  [id],
);

const updateSupplier = (data, id) => conn.execute(
  `UPDATE fornecedores 
    SET 
      nome = ?, 
      razao_social = ?, 
      cnpj = ?, 
      email = ?, 
      telefone = ? 
    WHERE (id = ?)`,
  [data.nome, data.razao_social, data.cnpj, data.email, data.telefone, id],
);

module.exports = {
  selectAll,
  insertSupplier,
  deleteSupplier,
  updateSupplier,
};