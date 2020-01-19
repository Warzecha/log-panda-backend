const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send("Log Panda is here!")
});

module.exports = router;
