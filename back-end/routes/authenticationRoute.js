const express = require('express');
const loginCheck = require('../controllers/loginCheck');

const router = express.Router();

router.post('/', loginCheck);

module.exports = router;
