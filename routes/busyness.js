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

router.route("/:id").get((req, res) => {
  Busyness.findById(req.params.id)
    .then((busyness) => res.json(busyness))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Busyness.findByIdAndDelete(req.params.id)
    .then(() => res.json("Busyness deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  Busyness.findById(req.params.id)
    .then((busyness) => {
      busyness.storeAddress = req.body.storeAddress;
      busyness.storeName = req.body.storeName;
      busyness.busyness = req.body.busyness;
      busyness.time = Date.parse(req.body.time);

      busyness
        .save()
        .then(() => res.json("Busyness updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
