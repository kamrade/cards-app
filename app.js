const express     = require('express');
const app         = express();
const port        = process.env.PORT || 5000;

const nav = [{
    link: '/',
    text: 'Home'
  },{
    link: '/cards',
    text: 'Cards'
  }
];

const cardRouter  = require('./src/routes/cardRouter')(nav);
const adminRouter  = require('./src/routes/adminRouter')(nav);

app.use(express.static('public'));
app.set('views','./src/views');
app.set('view engine', 'pug');

app.use('/cards', cardRouter);
app.use('/admin', adminRouter);

app.get('/', function(req, res) {
  res.render('index', {
    title: "Hello from render",
    nav: nav
  });
});

app.listen(port, function(err) {
  console.log('running server on port ' + port );
});