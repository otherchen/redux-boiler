var express = require('express');
var router = express.Router();

var UserModel = require('../../models/user');

/* GET all users */
router.get('/', function(req, res, next) {
  UserModel.find({}).exec()
  .then(function(users) {
    res.status(200).send(users);
  });
});

/* POST a user. */
router.post('/', function(req, res, next) {
  var user = new UserModel(req.body);

  user.save()
  .then(function() {
    res.status(200).send();
  });
});

module.exports = router;
