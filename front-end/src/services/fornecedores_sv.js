const HOST = 'http://localhost:3001/fornecedores';

export const insertSupplier = async (data) => {
  await fetch(HOST, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json', // Definindo o Content-Type como JSON
    },
  });
};

export const deleteSupplier = async (id) => {
  await fetch(`${HOST}/${id}`, {
    method: 'DELETE',
  });
};

export const updateSupplier = async (data) => {
  const { id } = data;

  await fetch(`${HOST}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json', // Definindo o Content-Type como JSON
    },
  });
};
