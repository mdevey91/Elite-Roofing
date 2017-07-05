var mongoose = require('mongoose');
var Schema = mongoose.Schema; //This is like a class constructor

var structure = new Schema({  //defining the schema of that database
    payment: { type: Number, default: 0.00},
    date: { type: Date, default: Date.now}
});

var model = mongoose.model('Payment',structure);

module.exports = model;
