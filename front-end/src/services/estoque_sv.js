const HOST = 'http://localhost:3001/estoque';

export const insertProduct = async (data) => {
  data.preco = Number(data.preco) / 100;
  await fetch(HOST, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json', // Definindo o Content-Type como JSON
    },
  });
};

export const deleteProduct = async (id) => {
  await fetch(`${HOST}/${id}`, {
    method: 'DELETE',
  });
};

export const updateProduct = async (data) => {
  const preco = Number(data.preco.replace(/\D/g, '')) / 100;
  data.preco = preco.toString();
  await fetch(HOST, {
    method: 'PUT',
    body: JSON.stringify({ ...data }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
