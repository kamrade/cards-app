const express    = require('express');
const cardRouter = express.Router();
let   cards      = require('./cards');

let router = function(nav) {

  cardRouter.route('/')
    .get(function(req, res) {
      res.render('cardListView', {
        nav: nav,
        cards: cards
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