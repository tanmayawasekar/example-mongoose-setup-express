var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderStats = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: 'Dish', unique: true },
  prediction: {
    type: Number,
    default: 0
  },
  createdTillNow: {
    type: Number,
    default: 0
  }
},
  {
    timestamps: true
  });

mongoose.model('OrderStats', orderStats);

