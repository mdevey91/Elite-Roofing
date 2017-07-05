const express = require('express');
const mongoose = require('mongoose');

const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)\
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const cors = require('cors');
const expressValidator = require('express-validator');
// var expressValidator = require('express-validator');
const Payment = require("./payments");


const app = express();

// middlewarwe
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(expressValidator());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// open connection to the database
mongoose.connect('mongodb://tracker:123456789@ds011785.mlab.com:11785/teacher-tracker');

app.get("/payments", (req, res) => {
  Payment.find({}, {}, (error, data) => {
    if(error){
      console.log(error);
      res.sendStatus(500);
    }
    else{
      res.send(data);
    }
  });
});


app.post('/new_payment', (req, res) => {
  var newPayment = new Payment({
    payment: req.body.payment,
    date: req.body.date
  });
  newPayment.save((err, data) => {
    if(err){
      res.json({success: false, msg: 'payment failed'})
    }
    else{
      console.log(data);
      res.json({success: true, msg: 'payment made', paymentInfo: data});
    }
  })
})

// app.get needs a url and a function
// this is the example of getting by parameter
app.get('/name/:id', (req, res) => {
  console.log(req.params.id)
  res.send({fname: 'Matthew', lname: 'Devey'})
});

// Does exactly the same things as the app.get above. The differece is whether we use mongoose or not
app.get('/pay', (req, res) => {
  mongoose.model('Payment').find((err, Payment) => {
    res.send(Payment);
  });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


/*
How to send information in order to find by certain paramters while "getting"?
paremters
query
*/
