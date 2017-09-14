const express     = require('express');
const authRouter  = express.Router();
const mongodb     = require('mongodb').MongoClient;
let   passport    = require('passport');

let router = function() {
  
  authRouter.route('/signUp')
    
    .post(function(req, res) {
      let url = 'mongodb://localhost:27017/cardsApp';
      mongodb.connect(url, function(err, db) {
        let collection = db.collection('users');
        let user = {
          username: req.body.userName,
          password: req.body.password
        };
        collection.insert(user, function(err, results) {
          req.login(results.ops[0], function() {
            res.redirect('/auth/profile');
          });
        });
      });
    });

  authRouter.route('/signin')
    // using local strategy
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), function(req, res) {
      res.redirect('/auth/profile');
    })

  authRouter.route('/profile')
    .get(function(req, res) {
      res.json(req.user);
    });
  
  return authRouter;
};

module.exports = router;