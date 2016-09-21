// required libraries to run app
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
// dotenv helps us to read information in our .env file
const dotenv = require('dotenv')
dotenv.load()
// your models must be required in order to access them in your app.
var db = require('./models');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var methodOverride = require('method-override');



var app = express();

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

// tell our server where our static files live.
app.use(express.static("static"));
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// log to check if session is working
// if log msg shows in terminal, it is working
console.log(process.env.SESSION_SECRET);

// homepage
app.get("/", function(req,res) {
  res.render("index.ejs");
  console.log("index rendered");
});

app.get("/user", isLoggedIn, function(req,res) {
  res.render('user.ejs');
  console.log("user page rendered after logged in");
  // need data to put user's first name
})


app.use('/auth', require('./controllers/auth'));

app.use('/posting', require('./controllers/posting'));


// guest
app.get("/guest", function(req,res) {
  res.render("guest.ejs");
  console.log("guest page rendered");
})



// // Using callback
// geocoder.geocode('16 ang mo kio central 3 singapore 567748', function(err, res) {
//   console.log(res);
// });

// // Or using Promise
// geocoder.geocode('29 champs elysée paris')
//   .then(function(res) {
//     console.log(res);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });



var server = app.listen(3000);

// process.env.port ||

module.exports = server;
