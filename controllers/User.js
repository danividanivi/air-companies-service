// Load required packages
var User = require('../models/User');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

// Create endpoint /api/users/:user_id for GET
exports.getUser = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);

        if (!user) {
            var error = new Object();
            error.status = 404;
            error.message = 'The user id ' + req.params.user_id + ' cannot be found';
            res.status(error.status).json(error);
        } else {
            res.json(user);
        }
    });
};