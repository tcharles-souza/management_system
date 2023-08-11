const formatSale = (req, _res, next) => {
  const { customer, user, fullPrice } = req.body;

  req.body = {
    total: Number(fullPrice),
    clienteId: customer ? customer.id : null, 
    operador: user || null,
  };
  next();
};

module.exports = formatSale;
