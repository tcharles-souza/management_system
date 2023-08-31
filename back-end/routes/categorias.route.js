const express = require('express');

const { categoriasController } = require('../controllers');

const router = express.Router();

router.get('/', categoriasController.getAll);

module.exports = router;