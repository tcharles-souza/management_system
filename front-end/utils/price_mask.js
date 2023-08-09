const priceMask = (value) => {
  value = value.replace(/\D/g, '');

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(value) / 100,
  );

  return result === 'NaN' ? '0.00' : result;
};

export default priceMask;
