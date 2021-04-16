const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Data = require("../../models/data");
const User = require("../../models/user");
const verify = require("./verifyToken");

//BREW DATA ROUTE
router.get("/", verify, async (req, res) => {
  try {
    const data = await Data.find({ userid: req.user._id });
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
});


//ADDING NEW BREW DATA ROUTE
router.post("/", verify, async(req, res) => {
  const newBrewData = new Data({
    userid: req.user._id,
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date,
    method: req.body.method,
    ratio: req.body.ratio,
    grind: req.body.grind,
    coffee: req.body.coffee,
    water: req.body.water,
    feedback: req.body.feedback,
  });

  try {
    newBrewData.save();
    res.status(200).json(newBrewData);
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
});

module.exports = router;
