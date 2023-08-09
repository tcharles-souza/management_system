const conn = require('../connection');

const selectAll = () => conn.execute('SELECT * FROM categorias');

module.exports = {
  selectAll,
};