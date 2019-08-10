var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order = new Schema({
  dishName: {
    type: Schema.Types.ObjectId,
    ref: 'Dish',
    required: true,
  },
  dishQuantity: {
    type: Number,
    required: true,
  },
},
  {
    timestamps: true
  });

mongoose.model('Order', order);
