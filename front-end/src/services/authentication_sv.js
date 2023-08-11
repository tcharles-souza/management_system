const HOST = 'http://localhost:3001/authentication';

export const userAuthentication = async (data) => {
  const response = await fetch(HOST, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json', // Definindo o Content-Type como JSON
    },
  });

  const result = await response.json();

  const { authentication } = result;

  if (authentication) return authentication;

  return false;
};
