var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order = new Schema({
  dish: {
    type: Schema.Types.ObjectId,
    ref: 'Dish',
    required: true,
  },
  dishQuantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED"],
    default: "PENDING",
  }
},
  {
    timestamps: true
  });

order.post('save', function (doc) {
  if (doc.status == "COMPLETED") {
    updateObject = {
    $inc : {
      createdTillNow: this.dishQuantity,
    },
    dish: this.dish,
    }
  }
  else {
    updateObject = {}
  }
  mongoose.model("OrderStats").findOneAndUpdate({
    dish: this.dish
  }, updateObject, { upsert: true, })
    .then()
    .catch()
});

mongoose.model('Order', order);

