const mongoose = require("mongoose");
const { String } = mongoose.Schema.Types;
const DataSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userid: String,
  date: Date,
  method: String,
  ratio: String,
  grind: String,
  coffee: String,
  water: String,
  feedback: String
});

module.exports = mongoose.model("Data", DataSchema);
