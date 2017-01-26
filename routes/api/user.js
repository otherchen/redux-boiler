var express = require('express');
var router = express.Router();
var account = require('../../utils/account');
var auth = require('../../utils/auth');
var checkToken = require('../../middleware/check-jwt');

/* Login an existing user */
router.post('/login', function(req, res, next) {
  account.login(req.body)
  .then(function(token) {
    res.status(200).send({ token: token });
  })
  .catch(function(error) {
    res.status(400).send({ error: error.message });
  });
});

/* Create a new user */
router.post('/register', function(req, res, next) {
  account.register(req.body)
  .then(function(token) {
    res.status(200).send({ token: token });
  })
  .catch(function(error) {
    res.status(400).send({ error: error.message });
  });
});

/* Test jwt for expiration date and secret */
router.get('/verify', checkToken, function(req, res, next) {
  res.status(200).send();
});

module.exports = router;
