require("dotenv").config();

const router = require("express").Router();
let Busyness = require("../models/busyness.model");

const axios = require("axios");

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

//this stuff to get from frontend
var longitude = 43.87896;
var latitude = -79.413383;

//longitude = 37.365892;
//latitude = -122.058422;
var radius = 5000; //in metres

var link1 =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
  longitude +
  "," +
  latitude +
  "&radius=" +
  radius +
  "&type=grocery_or_supermarket&fields=name,formatted_address,user_ratings_total,place_id&key=" +
  API_KEY;

var link2 =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
  longitude +
  "," +
  latitude +
  "&radius=" +
  radius +
  "&type=department_store&fields=name,formatted_address,user_ratings_total,place_id&key=" +
  API_KEY;

var names = [];
var address = [];
var rating = [];
var storeSize = [];
var storeId = [];
var data = [];
var data2 = [];

router.get("/getstores", (request, response) => {
  axios
    .get(link1)
    .then((getResponse) => {
      console.log("GET Response");
      data = getResponse.data;
      //response.send(data);

      for (var i = 0; i < data.results.length; i++) {
        names[i] = data.results[i].name;
        address[i] = data.results[i].vicinity;
        rating[i] = data.results[i].rating;
        storeSize[i] = data.results[i].user_ratings_total;
        storeId[i] = data.results[i].place_id;
      }
      return axios.get(link2);
    })
    .then((getResponse2) => {
      console.log("GET Response 2");
      data2 = getResponse2.data;

      response.send(data2);
      var j = 0;

      for (
        var i = data.results.length - 1;
        i < data.results.length - 1 + data2.results.length;
        i++
      ) {
        if (
          data2.results[j].name.includes("Costco") ||
          data2.results[j].name.includes("Walmart")
        ) {
          names[i] = data2.results[j].name;
          address[i] = data2.results[j].vicinity;
          rating[i] = data2.results[j].rating;
          storeSize[i] = data2.results[j].user_ratings_total;
          storeId[i] = data2.results[j].place_id;
          j++;
        }
      }
      //filterOutStores();
      sortSizes();
      display();
    })
    .catch((err) => {
      console.log("Error:" + err.message);
    });
});

function filterOutStores() {
  var j = 0;
  for (
    var i = data.results.length - 1;
    i < data.results.length - 1 + data2.results.length;
    i++
  ) {
    if (!names[j].includes("Costco") || !names[j].includes("Walmart")) {
      console.log(names[j]);
      names.splice(j, 1);
      address.splice(j, 1);
      rating.splice(j, 1);
      storeSize.splice(j, 1);
      storeId.splice(j, 1);
    }
    j++;
  }
}

function display() {
  for (var i = 0; i < names.length; i++) {
    console.log(names[i] + " " + address[i]);
  }
}

// sort stores by size
function sortSizes() {
  var swapp;
  var n = storeSize.length - 1;
  do {
    swapp = false;
    for (var i = 0; i < n; i++) {
      if (storeSize[i] < storeSize[i + 1]) {
        var temp = storeSize[i];
        storeSize[i] = storeSize[i + 1];
        storeSize[i + 1] = temp;

        var temp2 = names[i];
        names[i] = names[i + 1];
        names[i + 1] = temp2;

        var temp3 = rating[i];
        rating[i] = rating[i + 1];
        rating[i + 1] = temp3;

        var temp4 = address[i];
        address[i] = address[i + 1];
        address[i + 1] = temp4;

        swapp = true;
      }
    }
    n--;
  } while (swapp);
}

router.route("/").get((req, res) => {
  Busyness.find()
    .then((busynesss) => res.json(busynesss))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const storeAddress = req.body.storeAddress;
  const storeName = req.body.storeName;
  const busyness = req.body.busyness;

  const newBusyness = new Busyness({
    storeAddress,
    storeName,
    busyness,
  });

  newBusyness
    .save()
    .then(() => res.json("Busyness added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//for when user wants to view busyness (First they send their coordinates and radius)
router.route("/view").post((req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const radius = req.body.radius;

  //console.log(latitude + "," + longitude);
  //console.log(radius);
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
/*
router.route("/update/:id").post((req, res) => {
  Busyness.findById(req.params.id)
    .then((busyness) => {
      busyness.storeAddress = req.body.storeAddress;
      busyness.storeName = req.body.storeName;
      busyness.busyness = req.body.busyness;

      busyness
        .save()
        .then(() => res.json("Busyness updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
*/

module.exports = router;
