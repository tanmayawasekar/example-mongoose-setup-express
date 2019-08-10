var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderPrediction = new Schema({
  dishName: { type: Schema.Types.ObjectId, ref: 'Dish', unique: true },
  prediction: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true
  });

mongoose.model('orderPrediction', orderPrediction);

