var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const User = new Schema({
  title: String,
  body: String,
  date: Date
});

const MyModel = mongoose.model('Person', User);
