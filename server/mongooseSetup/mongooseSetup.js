const mongoose = require("mongoose");
require("dotenv").config();

module.exports = function mongooseSetup() {
  mongoose.connect(process.env.API_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  let db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("connection success to database!");
  });
};
