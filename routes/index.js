var express = require('express');
var router = express.Router();

/*
  Render root element for react hook
  Let react-router deal with routing and handling 404 errors
*/
router.get('/*', function(req, res, next) {
  res.render('index');
});

module.exports = router;
