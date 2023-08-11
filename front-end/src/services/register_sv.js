const HOST = 'http://localhost:3001/register';

export const createNewUser = async (data) => {
  await fetch(HOST, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json', // Definindo o Content-Type como JSON
    },
  });
};

export const loginValidate = async (data) => {
  await fetch(HOST, {
    method: 'GET',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json', // Definindo o Content-Type como JSON
    },
  });
};
