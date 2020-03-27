const mongoose = require("mongoose");
const { String } = mongoose.Schema.Types;
const CoffeeShopDataSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: String,
  house: String,
  street: String,
  geom: Object,
  image: String,
  businesstradename: String
});

module.exports = mongoose.model("CoffeeShopData", CoffeeShopDataSchema);
