export const normalizeText = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toUpperCase();

// console.log('2003409999979'.slice(6, 12));
