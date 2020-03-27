const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Data = require("../../models/data");
const verify = require("./verifyToken");

//route for getting data
router.get("/", verify, (req, res) => {
  Data.find({ userid: req.user._id })
    .exec()
    .then(brewData => {
      console.log(brewData);
      res.status(200).json(brewData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//add brewData route
router.post("/", verify, (req, res) => {
  let notes = "";
  if (req.body.notes.bitter && req.body.notes.strong) {
    notes = "Coffee was too strong & bitter";
  } else if (req.body.notes.bitter) {
    notes = "Coffee was bitter";
  } else if (req.body.notes.strong) {
    notes = "Coffee was too strong";
  } else if (req.body.notes.weak) {
    notes = "Coffee was too weak";
  } else if (req.body.notes.perfect) {
    notes = "Coffee was PERFECT!";
  } else {
    notes = "You didn't provide any feedback";
  }

  const newBrewData = new Data({
    userid: req.user._id,
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date,
    method: req.body.method,
    ratio: req.body.ratio,
    grind: req.body.grind,
    coffee: req.body.coffee,
    water: req.body.water,
    notes: notes
  });

  newBrewData
    .save()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  res.json(newBrewData);
});

module.exports = router;
