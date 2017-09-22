const express = require('express');    //call express
const app = express();                 //define app
const port = process.env.PORT || 8080; //set port
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session      = require('express-session');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/api', require('./routes/api')); //Getting the API Routes

// error handling middleware
app.use(function(err,req,res,next){
    // console.log(err);
    res.status(422).send({error: err.message});
});

// Connect to Database
// =============================================================

mongoose.connect('mongodb://admin:admin@ds129144.mlab.com:29144/mycoach');
mongoose.Promise = global.Promise;

// Passport Setting
//==============================================================
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in sessionß

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// Start Server
// =============================================================
app.listen(port);

console.log('server started' + port);