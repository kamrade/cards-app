const express     = require('express');
const app         = express();
const port        = process.env.PORT || 5000;

const nav = [{
    link: '/',
    text: 'Home'
  },{
    link: '/books',
    text: 'Books'
  }, {
    link: '/authors',
    text: 'Authors'
  }
];

const bookRouter  = require('./src/routes/bookRouter');

app.use(express.static('public'));
app.set('views','./src/views');
app.set('view engine', 'pug');

app.use('/books', bookRouter);

app.get('/', function(req, res) {
  res.render('index', {
    title: "Hello from render",
    nav: nav
  });
});

app.listen(port, function(err) {
  console.log('running server on port ' + port );
});