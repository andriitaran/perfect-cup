const express = require("express");
const router = express.Router();
const helper = require("../../helper/helper");

const dataFile = __dirname + "/../../models/data.json";
const data = require(dataFile);

//route for getting data
router.get("/", (req, res) => {
  return res.send(
    data.map(element => {
      return (element = {
        id: element.id,
        date: element.date,
        timestamp: element.timestamp,
        method: element.method,
        ratio: element.ratio,
        grind: element.grind,
        coffee: element.coffee,
        water: element.water,
        notes: element.notes,
        reccomendations: element.reccomendations
      });
    })
  );
});

//add element route
router.post("/", (req, res) => {
  const newElement = {
    id: req.body.id,
    name: req.body.name
  };
  data.push(newElement); //pushes new element into an existing array
  helper.writeJSONFile(dataFile, data); //writes new array of elements to JSON
  res.json(data); //return a new array of elements
});

module.exports = router;
