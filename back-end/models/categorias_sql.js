const conn = require('../config/connection');

const selectAll = () => conn.execute('SELECT * FROM categorias');

module.exports = {
  selectAll,
};