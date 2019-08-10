var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const dish = new Schema({
  dishName: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
},
  {
    timestamps: true,
  });

mongoose.model('Dish', dish);
