const conn = require('../config/connection');

const createNewUser = (data) => conn.execute(
  `INSERT INTO usuarios (usuario, senha) 
  VALUES (?, ?)`,
  [data.username, data.password],
);

const selectAll = () => conn.execute('SELECT * FROM usuarios');

module.exports = {
    createNewUser,
    selectAll,
};