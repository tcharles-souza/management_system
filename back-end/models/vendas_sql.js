const conn = require('../config/connection');

const selectAllSales = () => conn.execute(
  `SELECT 
      v.id_venda cod,
      v.data_venda 'time',
      v.cliente_id codCliente,
      CONCAT(c.nome, ' ', c.sobrenome) nomeCliente,
      v.vendedor,
      v.total
  FROM vendas v
  LEFT JOIN clientes c
  ON v.cliente_id = c.id`,
);

const insertSale = ({ total, clienteId, operador }) => conn.execute(
  `INSERT INTO vendas (data_venda, cliente_id, vendedor, total)
  VALUES (NOW(), ?, ?, ?)`,
  [clienteId, operador, total],
);

const insertProductSale = async ({ data: cashier, idVenda }) => {
  // Monta um array de arrays ex: [ 35, 1, 2, 13.9 ], [ 35, 2, 1, 19.9 ], [ 35, 5, 1, 10 ] ]
  const values = cashier.map((sale) => [Number(idVenda), sale.id, sale.quantidade, sale.preco]);

  // Monta os placeholders de acordo com a quantidade de VALUES que irei precisar
  // tomando o exemplo acima: (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)
  const placeholders = values.map(() => '(?, ?, ?, ?)').join(', ');

// Flatten the array of arrays:  cria um novo array com todos elementos sub-arrays concatenados, ou seja,
// vai fazer com que meu 'values' fique no formato: [ 35, 1, 2, 13.9, 35, 2, 1, 19.9, 35, 5, 1, 10]
  const flattenedValues = values.flat();

  await conn.execute(
    `INSERT INTO venda_produto (id_venda, id_produto, quantidade, preco)
    VALUES ${placeholders}`,
    flattenedValues,
  );
};

const selectSaleProduct = (id) => conn.execute(
  `SELECT 
    vp.id_venda,
    vp.id_produto,
    vp.quantidade,
    vp.total,
    p.preco,
    p.descricao
  FROM venda_produto vp
  INNER JOIN produtos p
  ON vp.id_produto = p.id
  WHERE vp.id_venda = ?`,
  [id],
);

module.exports = {
  insertSale,
  insertProductSale,
  selectAllSales,
  selectSaleProduct,
};