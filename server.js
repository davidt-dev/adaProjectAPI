const express = require('express');    //call express
const app = express();                 //define app
const port = process.env.PORT || 3000; //set port
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

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



// Start Server
// =============================================================
app.listen(port);

console.log('server started' + port);