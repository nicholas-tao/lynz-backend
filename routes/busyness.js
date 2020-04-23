require("dotenv").config();

const router = require("express").Router();
let Busyness = require("../models/busyness.model");

const axios = require("axios");

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

//this stuff to get from frontend
var longitude = 43.87896;
var latitude = -79.413383;
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

/*
router.get("/getstores", (request, response) => {
  axios
    .get(link1)
    .then((getResponse) => {
      console.log("GET Response");
      data = getResponse.data;
      response.send(data);

      for (var i = 0; i < data.results.length; i++) {
        names[i] = data.results[i].name;
        address[i] = data.results[i].vicinity;
        rating[i] = data.results[i].rating;
        storeSize[i] = data.results[i].user_ratings_total;
        storeId[i] = data.results[i].id;
      }
      sortSizes();
    })
    .catch(function (error) {
      console.log("Error occured");
    });
});

router.get("/getstores", (request, response) => {
  axios
    .get(link2)
    .then((getResponse) => {
      console.log("GET Response");
      data2 = getResponse.data;
      response.send(data2);

      for (
        var i = data.results.length - 1;
        i < data.results.length - 1 + data2.results.length;
        i++
      ) {
        names[i] = data.results[i].name;
        address[i] = data.results[i].vicinity;
        rating[i] = data.results[i].rating;
        storeSize[i] = data.results[i].user_ratings_total;
        storeId[i] = data.results[i].id;
      }
      sortSizes();
      display();
    })
    .catch(function (error) {
      console.log("Error occured");
    });
});
*/

router.get("/getstores", (request, response) => {
  axios
    .get(link1)
    .then((getResponse) => {
      console.log("GET Response");
      data = getResponse.data;
      response.send(data);

      for (var i = 0; i < data.results.length; i++) {
        names[i] = data.results[i].name;
        address[i] = data.results[i].vicinity;
        rating[i] = data.results[i].rating;
        storeSize[i] = data.results[i].user_ratings_total;
        storeId[i] = data.results[i].id;
      }
      sortSizes();
      return axios.get(link2);
    })
    .then((getResponse2) => {
      console.log("GET Response 2");
      data2 = getResponse2.data2;
      response.send(data2);
      console.log(data2); //data2 is undefined
      for (
        var i = data.results.length - 1;
        i < data.results.length - 1 + data2.results.length;
        i++
      ) {
        names[i] = data.results[i].name;
        address[i] = data.results[i].vicinity;
        rating[i] = data.results[i].rating;
        storeSize[i] = data.results[i].user_ratings_total;
        storeId[i] = data.results[i].id;
      }
      sortSizes();
      display();
    })
    .catch((err) => {
      console.log("Error occured");
    });
});

function display() {
  for (var i = 0; i < names.length; i++) {
    if (names[i] == null) {
      break;
    }
    console.log(names[i]);
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
