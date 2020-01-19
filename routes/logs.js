const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('Logs list');
});


router.post('/', function(req, res) {
  res.send('Logs list');
});

module.exports = router;
