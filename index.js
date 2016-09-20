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



// login
// app.get("/login", function(req,res) {
//   res.render("login.ejs");
//   console.log("log in page rendered")
// });

//
// app.post("/login", login);
//
// function login(req,res) {
//   db.user.find({
//     where: {
//       username: req.body.username,
//       password: req.body.password
//     }
//   }).then(function(data) {
//     console.log("data");
//     res.render('user.ejs', {data:data});
//     console.log("home page rendered after log in");
//   })
// }


// signup
// app.get("/signup", function(req,res){
//   res.render("signup.ejs");
//   console.log("sign up page rendered");
// })
// app.post("/signup", signup);
//
// function signup(req,res) {
//   db.user.findOrCreate({
//     where: {username: req.body.username},
//     defaults: {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       password: req.body.password
//     }
//   }).spread(function(data,created) {
//       // render home page with client's username
//       res.render('user.ejs', {data:data});
//       console.log("home page rendered after sign up");
//   })
// }

app.use('/auth', require('./controllers/auth'));

app.use('/posting', require('./controllers/posting'));


// guest
app.get("/guest", function(req,res) {
  res.render("guest.ejs");
  console.log("guest page rendered");
})


var server = app.listen(3000);

// process.env.port ||

module.exports = server;



// app.post("/login", logIn);
// app.post("/signup", signUp);


//
