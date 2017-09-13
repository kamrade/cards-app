const express      = require('express');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const passport     = require('passport');
const session      = require('express-session');

const app          = express();
const port         = process.env.PORT || 5000;

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
const authRouter  = require('./src/routes/authRouter')(nav);

// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'library' }));
// passport
require('./config/passport')(app);

app.set('views','./src/views');
app.set('view engine', 'pug');

app.use('/cards', cardRouter);
app.use('/admin', adminRouter);
app.use('/auth',  authRouter);

app.get('/', function(req, res) {
  res.render('index', {
    title: "Cards Management Application",
    nav: nav
  });
});

app.listen(port, function(err) {
  console.log('running server on port ' + port );
});