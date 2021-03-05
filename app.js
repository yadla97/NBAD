var express=require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Books', { useNewUrlParser: true });
var app = express();


app.set('view engine','ejs');

app.use('/assets',express.static('assets'));


var itemDb = require('./utility/ItemDB');
app.use(session({secret: 'Token'}));

var catalogController = require('./routes/catalogController');
var profileController = require('./routes/profileController');
var emailer = require('./routes/server');

app.use('/',profileController);
app.use('/', catalogController);
app.use('/', emailer);

app.listen(8080);
