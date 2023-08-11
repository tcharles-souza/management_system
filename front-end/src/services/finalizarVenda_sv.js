// o corpo da venda precisa ter data YYYY-MM-DD, total(DECIMAL(10,2)), cliente;

const HOST = 'http://localhost:3001/vendas';

export const createSale = async (data) => {
  const response = await fetch(HOST, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = response.json();

  return result;
};

export const createSaleProduct = async (data) => {
  const { insertId } = data;

  await fetch(`${HOST}/${insertId}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
