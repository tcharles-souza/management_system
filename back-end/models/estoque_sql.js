const conn = require('../config/connection');

const selectAll = () => conn.execute(
  `SELECT
  p.id,
  p.codigo_de_barras,
  p.descricao,
  p.preco,
  p.unidade,
  p.estoque,
  p.balanca,
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
  `INSERT INTO produtos 
  (codigo_de_barras, descricao, preco, estoque, categoria_id, fornecedor_id, unidade, balanca)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    data.codigo_de_barras, 
    data.descricao, 
    data.preco, 
    data.estoque, 
    data.categoria_id, 
    data.fornecedor_id, 
    data.unidade,
    data.balanca,
  ],
);

const deleteProduct = (id) => conn.execute(
  'DELETE FROM produtos WHERE (id = ?)',
  [id],
);

const updateProduct = (data) => conn.execute(
  `UPDATE produtos SET
  codigo_de_barras,
  descricao = ?, 
  preco = ?, 
  categoria_id = ?, 
  fornecedor_id = ?, 
  estoque = ?, 
  unidade = ? WHERE (id = ?)`,
  [
    data.codigo_de_barras,
    data.descricao, 
    data.preco, 
    data.categoria, 
    data.fornecedor, 
    data.estoque, 
    data.unidade, 
    data.id],
);
module.exports = {
  selectAll,
  insertProduct,
  deleteProduct,
  updateProduct,
};