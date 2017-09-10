const express    = require('express');
const cardRouter = express.Router();
const mongodb     = require('mongodb').MongoClient;
// let   cards      = require('./cards');


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
      
      let id   = req.params.id;
      // вернуть все элементы массива с ID == id
      let cardsFiltered = getCardByID(cards, id);
      // так как id уникальны - взять первый элемент
      // на самом деле нужно будет как-то по другому реализовать
      let card = cardsFiltered[0];
      
      res.render('cardView', {
        nav: nav,
        card: card
      });

    });

  return cardRouter;
}

module.exports = router;