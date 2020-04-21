const router = require("express").Router();
let Busyness = require("../models/busyness.model");

router.route("/").get((req, res) => {
  Busyness.find()
    .then((busynesss) => res.json(busynesss))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const storeAddress = req.body.storeAddress;
  const storeName = req.body.storeName;
  const busyness = req.body.busyness;
  const time = Date.parse(req.body.time);

  const newBusyness = new Busyness({
    storeAddress,
    storeName,
    busyness,
    time,
  });

  newBusyness
    .save()
    .then(() => res.json("Busyness added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
