const express = require("express");
const router = express.Router();
const helper = require("../../helper/helper");

const shopsFile = __dirname + "/../../models/coffee-shops.json";
const shops = require(shopsFile);

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

//route for getting data
router.get("/", (req, res) => {
  return res.send(
    shops.map(shop => {
      return (shop = {
        id: shop.recordid,
        lat: shop.fields.geom.coordinates[1],
        lng: shop.fields.geom.coordinates[0],
        image: shop.fields.image,
        name: shop.fields.businesstradename,
        address: shop.fields.house + " " + titleCase(shop.fields.street),
        hours: "8AM - 9PM"
      });
    })
  );
});

module.exports = router;
