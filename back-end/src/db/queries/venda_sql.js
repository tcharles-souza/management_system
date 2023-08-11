const conn = require('../connection');

const insertSale = ({ total, clienteId, operador }) => conn.execute(
  `INSERT INTO vendas (data_venda, cliente, vendedor, total)
  VALUES (NOW(), ?, ?, ?)`,
  [clienteId, operador, total],
);

const insertProductSale = async ({ data: cashier, idVenda }) => {
  const values = cashier.map((sale) => [idVenda, sale.id, sale.quantidade, sale.preco]);

  const placeholders = values.map(() => '(?, ?, ?, ?)').join(', ');

  const flattenedValues = values.flat(); // Flatten the array of arrays

  await conn.execute(
    `INSERT INTO venda_produto (id_venda, id_produto, quantidade, preco)
    VALUES ${placeholders}`,
    flattenedValues,
  );
};

module.exports = {
  insertSale,
  insertProductSale,
};