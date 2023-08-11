const express = require('express');
const { createNewUser } = require('../db/queries/usuarios_sql');

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;

  try {
    await createNewUser(data);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;