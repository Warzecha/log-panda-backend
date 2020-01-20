const express = require('express');
const router = express.Router();
const {scan, list} = require('../controllers/MetricsController');

router.post('/scan', scan);

router.get('/', list);

module.exports = router;
