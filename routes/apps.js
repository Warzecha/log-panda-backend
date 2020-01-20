const express = require('express');
const router = express.Router();
const {create, list} = require('../controllers/AppController');

router.get('/', list);

module.exports = router;
