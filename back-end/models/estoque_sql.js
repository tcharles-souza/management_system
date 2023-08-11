const conn = require('../config/connection');

const selectAll = () => conn.execute(
  `SELECT
  p.id,
  p.nome,
  p.preco,
  p.unidade,
  p.estoque,
  c.nome categoria,
  f.nome fornecedor
FROM PadariaDB.produtos p
INNER JOIN PadariaDB.categorias c
INNER JOIN PadariaDB.fornecedores f
WHERE 
  p.categoria_id = c.id
AND 
  f.id = p.fornecedor_id
ORDER BY p.id`,
);

const insertProduct = (data) => conn.execute(
  `INSERT INTO produtos (nome, preco, categoria_id, fornecedor_id, estoque, unidade)
  VALUES (?, ?, ?, ?, ?, ?)`,
  [data.nome, data.preco, data.categoria_id, data.fornecedor_id, data.estoque, data.unidade],
);

const deleteProduct = (id) => conn.execute(
  'DELETE FROM produtos WHERE (id = ?)',
  [id],
);

const updateProduct = (data) => conn.execute(
  `UPDATE produtos SET 
  nome = ?, 
  preco = ?, 
  categoria_id = ?, 
  fornecedor_id = ?, 
  estoque = ?, 
  unidade = ? WHERE (id = ?)`,
  [data.nome, data.preco, data.categoria, data.fornecedor, data.estoque, data.unidade, data.id],
);
module.exports = {
  selectAll,
  insertProduct,
  deleteProduct,
  updateProduct,
};