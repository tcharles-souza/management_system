const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'America/Sao_Paulo' };

export const getIsoDate = (strDate) => {
  const isoDate = new Date(strDate);

  return new Intl.DateTimeFormat('pt-BR', options).format(isoDate);
};
