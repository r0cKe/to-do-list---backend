const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
