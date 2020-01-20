const express = require('express');
const router = express.Router();
const {scan} = require('../controllers/MetricsController');

router.post('/scan', scan);

module.exports = router;
