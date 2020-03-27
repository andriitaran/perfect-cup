const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Shops = require("../../models/shops");

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
// router.get("/", (req, res) => {
//   return res.send(
//     shops.map(shop => {
//       return (shop = {
//         id: shop.id,
//         lat: shop.geom.coordinates[1],
//         lng: shop.geom.coordinates[0],
//         image: shop.image,
//         name: shop.businesstradename,
//         address: shop.house + " " + titleCase(shop.street),
//         hours: "8AM - 9PM"
//       });
//     })
//   );
// });

//route for getting data
router.get("/", (req, res) => {
  Shops.find()
    .exec()
    .then(shopData => {
      console.log(shopData);
      res.status(200).json(shopData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res) => {
  const newShop = new Shops({
    _id: new mongoose.Types.ObjectId(),
    house: req.body.house,
    street: req.body.street,
    geom: req.body.geom,
    image: req.body.image,
    businesstradename: req.body.businesstradename
  });

  newShop
    .save()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  res.json(newShop);
});

module.exports = router;
