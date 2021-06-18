const express = require("express");
const router = express.Router();
const Shops = require("../../models/shops");

//SHOPS DATA ROUTE
router.get("/", async (req, res) => {
  const shops = await Shops.find().exec();
  try {
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
});

module.exports = router;
