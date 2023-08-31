const express = require('express');

const { estoqueController } = require('../controllers');

const router = express.Router();

router.get('/', estoqueController.getAll);

router.post('/', estoqueController.create);

router.delete('/:id', estoqueController.remove);

router.put('/', estoqueController.update);

module.exports = router;
