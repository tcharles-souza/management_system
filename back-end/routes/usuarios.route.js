const express = require('express');
const { usuariosController } = require('../controllers');

const router = express.Router();

router.post('/', usuariosController.create);

module.exports = router;