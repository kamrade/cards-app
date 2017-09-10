const express = require('express');
const bookRouter = express.Router();

let router = function(nav) {
  let books = [
    {
      id: 0,
      title:  'War and Peace',
      genre:  'Historical Fiction',
      author: 'Lev Nickolaevich Tolstoy',
      read:   false
    }, {
      id: 1,
      title:  'Les Miserables',
      genre:  'Historical Fiction',
      author: 'Victor Hugo',
      read:   false
    }
  ];

  bookRouter.route('/')
    .get(function(req, res) {
      res.render('bookListView', {
        nav: nav,
        books: books
      });
    });

  bookRouter.route('/:id')
    .get(function(req, res) {
      
      let id = req.params.id;
      res.render('bookView', {
        nav: nav,
        book: books[id]
      });

    });

  return bookRouter;
}

module.exports = router;