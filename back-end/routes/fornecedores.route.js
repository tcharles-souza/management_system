const express = require('express');

const { fornecedoresController } = require('../controllers');

const router = express.Router();

router.get('/', fornecedoresController.getAll);

router.post('/', fornecedoresController.create);

router.delete('/:id', fornecedoresController.remove);

router.put('/:id', fornecedoresController.update);

module.exports = router;