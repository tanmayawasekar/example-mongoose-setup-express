var express = require('express');
var router = express.Router();
var mongoose = require("mongoose")
var personModel = mongoose.model("Person")
/* GET users listing. */
router.get('/', function(req, res, next) {
  let a = new personModel({
      title: "String",
      body: "String",
      date: new Date()
  })
  a.save().then(value => res.json(a))
});

module.exports = router;
