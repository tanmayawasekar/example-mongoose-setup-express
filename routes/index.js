var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/order/new', function (req, res, next) {
  res.render('order', { title: 'Express' });
});

async function newOrder(req, res) {
  const orderModel = mongoose.model("Order")
  let dish = await mongoose.model("Dish").findOne({
    "dishName": req.body.dish.trim()
  });
  if (dish) {
    console.log('dish: ', dish);
    var savedDish = dish
  }
  else {
    newDish = new mongoose.model("Dish");
    savedDish = await newDish({
      "dishName": req.body.dish.trim(),
    }).save()
  }
  console.log('savedDish: ', savedDish);
  savedOrder = await mongoose.model("Order")({
    "dish": savedDish._id,
    "dishQuantity": req.body.quantity
  }).save()
  console.log('savedOrder: ', savedOrder);
  if (savedOrder) {
    req.app.get("socket").broadcast.emit('reload-kichen-pages', "done")
    req.app.get("socket").emit('reload-kichen-pages', "done")
    res.render('order', { title: 'Express' });
  }
  else {
    res.render('error', {
      error: new Error("Order Not Created Try again")
    })
  }
}

router.post('/order/new', function (req, res, next) {
  newOrder(req, res);
});

async function kitchDisplay(req, res) {

  finalResult = []
  orderArray = await mongoose.model("Order").find().populate("dish").sort("-createdAt")
  console.log('orderArray: ', orderArray);
  for (let i = 0; i < orderArray.length; i++) {
    let order = orderArray[i];
    console.log('order: ', order);
    orderStats = await mongoose.model("OrderStats").findOne({
      dish: order.dish._id
    })
    console.log('orderStats: ', orderStats);
    finalResult.push(
      {
        name: order.dish.dishName.toUpperCase(),
        dishQuantity: order.dishQuantity,
        createdTillNow: orderStats.createdTillNow,
        prediction: orderStats.prediction,
        showDoneButton: order.status == "PENDING",
        _id: order._id,
      }
    )
  }

  res.render('kitchen-display', { finalResult: finalResult.sort()});
}

router.get('/kitchen/display', function (req, res, next) {
  kitchDisplay(req, res)
});

router.post('/order/mark-complete', function (req, res, next) {
  mongoose.model("Order").findById(req.body.id)
  .then(order => {
    order.status = "COMPLETED"
    order.save()
    .then(order => {
      req.app.get("socket").broadcast.emit('reload-kichen-pages', "done")
      req.app.get("socket").emit('reload-kichen-pages', "done")
      res.sendStatus(200);
    })
  })
});

module.exports = router;
