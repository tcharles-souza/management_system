const express = require('express');
const { clientesController } = require('../controllers');

const router = express.Router();

router.get('/', clientesController.getAll);

router.post('/', clientesController.create);

router.delete('/:id', clientesController.remove);

router.put('/', clientesController.update);

module.exports = router;
