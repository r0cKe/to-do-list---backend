const express = require("express");
// require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDB = require("./config/db");

const Item = require("./models/item.js");

// connects to database
connectToDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch tasks

app.get("/", async (req, res) => {
  const items = await Item.find({});
  res.json({ tasks: items });
});

// Adding Tasks

app.post("/", (req, res) => {
  const task = req.body.task;

  const item = new Item({
    name: task,
  });
  item.save();
  res.redirect("/");
});

// Updating checkbox

app.post("/check", async (req, res) => {
  const { checkedItemId, checked } = req.body;

  await Item.findByIdAndUpdate(checkedItemId, { checked: checked });
  res.redirect("/");
});

// Rearrange tasks
app.post("/rearrange", async (req, res) => {
  const { dragItem, dragOverItem } = req.body;
  await Item.findByIdAndUpdate(dragItem._id, {
    name: dragOverItem.name,
    checked: dragOverItem.checked,
  });
  await Item.findByIdAndUpdate(dragOverItem._id, {
    name: dragItem.name,
    checked: dragItem.checked,
  });
  res.redirect("/");
});

// Deleting tasks

app.post("/delete", async (req, res) => {
  const { checkedItemId } = req.body;
  await Item.findByIdAndDelete(checkedItemId);
  res.redirect("/");
});

app.listen(process.env.PORT || 4500, () => {
  console.log("Server has started successfully.");
});
