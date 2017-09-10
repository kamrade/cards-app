const express     = require('express');
const adminRouter = express.Router();
const mongodb     = require('mongodb').MongoClient;

let   cards      = require('./cards');

var router = function(nav) {

  adminRouter.route('/addCards')
    .get(function(req, res) {
      let url = 'mongodb://localhost:27017/cardsApp';
      
      mongodb.connect(url, function(err, db) {
        let collection = db.collection('cards');
        collection.insertMany(cards, function(err, results) {
          res.send(results);
          db.close();
        });
      }); 
    });

  return adminRouter;

};

module.exports = router;
