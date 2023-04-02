const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const conn = mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Successfully Connected");
      });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectToDB;
