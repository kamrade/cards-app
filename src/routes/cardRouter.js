const express     = require('express');
const cardRouter  = express.Router();
const mongodb     = require('mongodb').MongoClient;
const objectId    = require('mongodb').ObjectID;

let router = function(nav) {

  cardRouter.route('/')
    .get(function(req, res) {
      let url = 'mongodb://localhost:27017/cardsApp';
      mongodb.connect(url, function(err, db) {
        let collection = db.collection('cards')
      
        collection.find({}).toArray(function(err, results) {
          res.render('cardListView', {
            nav: nav,
            cards: results
          });
        });
        // db.close();
      });
    });

  function getCardByID(cards, id) {
    return cards.filter(function(card) {
      return card.cardID == id;
    });
  }

  cardRouter.route('/:id')
    .get(function(req, res) {
      let id  = new objectId(req.params.id);
      let url = 'mongodb://localhost:27017/cardsApp';
      
      mongodb.connect(url, function(err, db) {
        let collection = db.collection('cards')
        collection.findOne({_id: id}, function(err, results) {
          res.render('cardView', {
            nav: nav,
            card: results
          });
        });
      });

    });

  return cardRouter;
}

module.exports = router;