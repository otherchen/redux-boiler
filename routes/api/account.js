var express = require('express');
var router = express.Router();
var account = require('../../utils/account');

/* Login an existing user */
router.post('/login', function(req, res, next) {
  account.login(req.body)
  .then(function(token) {
    res.status(200).send({ token: token });
  })
  .catch(function(error) {
    res.status(400).send({ error: error.toString() });
  });
});

/* Create a new user */
router.post('/register', function(req, res, next) {
  account.register(req.body)
  .then(function(token) {
    res.status(200).send({ token: token });
  })
  .catch(function(error) {
    res.status(400).send({ error: error.toString() });
  });
});

module.exports = router;
