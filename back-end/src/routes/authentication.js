const express = require('express');
const loginCheck = require('./middlewares/loginCheck');

const router = express.Router();

router.post('/', loginCheck);

module.exports = router;
