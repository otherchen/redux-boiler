import express from 'express';
import account from '../../utils/account';
import auth from '../../utils/auth';
import checkToken from '../../middleware/check-jwt';
const router = express.Router();

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

export default router;
