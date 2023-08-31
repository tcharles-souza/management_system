const priceStart = 6;
const priceEnd = 12;
const priceDivisor = 100;
const decimal = 3;

export const getQuantity = (barCode, value) => {
  const price = Number(barCode.slice(priceStart, priceEnd)) / priceDivisor;

  const quantity = (price / Number(value)).toFixed(decimal);

  return !Number.isNaN(Number(quantity)) ? quantity : '1';
};
