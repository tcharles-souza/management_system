const HOST = 'http://localhost:3001/clientes';

export const insertCliente = async (data) => {
  await fetch(HOST, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json', // Definindo o Content-Type como JSON
    },
  });
};

export const deleteCliente = async (id) => {
  await fetch(`${HOST}/${id}`, {
    method: 'DELETE',
  });
};

export const updateCliente = async (data) => {
  await fetch(HOST, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
