const { usuarios } = require('../models');

const create = async (req, res) => {
  const data = req.body;

  try {
    await usuarios.createNewUser(data);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  create,
};