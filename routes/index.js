var express = require('express');
var router = express.Router();

/* Render root element for react hook */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
