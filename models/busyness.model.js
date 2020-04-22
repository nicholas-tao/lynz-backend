const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const busynessSchema = new Schema(
  {
    storeAddress: { type: String, required: true },
    storeName: { type: String, required: true },
    busyness: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Busyness = mongoose.model("Busyness", busynessSchema);

module.exports = Busyness;
