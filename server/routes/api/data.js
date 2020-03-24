const express = require("express");
const router = express.Router();
const helper = require("../../helper/helper");

const dataFile = __dirname + "/../../models/data.json";
const data = require(dataFile);

//route for getting data
router.get("/", (req, res) => {
  return res.send(
    data.map(brewData => {
      return (brewData = {
        id: brewData.id,
        date: brewData.date,
        method: brewData.method,
        ratio: brewData.ratio,
        grind: brewData.grind,
        coffee: brewData.coffee,
        water: brewData.water,
        notes: brewData.notes
      });
    })
  );
});

//add brewData route
router.post("/", (req, res) => {
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

  const newBrewData = {
    id: req.body.id,
    date: req.body.date,
    method: req.body.method,
    ratio: req.body.ratio,
    grind: req.body.grind,
    coffee: req.body.coffee,
    water: req.body.water,
    notes: notes
  };
  data.push(newBrewData); //pushes new brewData into an existing array
  helper.writeJSONFile(dataFile, data); //writes new array of elements to JSON
  res.json(data); //return a new array of elements
});

module.exports = router;
