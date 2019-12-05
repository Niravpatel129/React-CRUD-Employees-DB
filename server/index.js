const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
app.use(express.json());

const mongooseSetup = require("./mongooseSetup/mongooseSetup.js");

const employeesRoutes = require("./routes/employeesRoutes");

mongooseSetup();

app.use("/api", employeesRoutes);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(8080, () => console.log("Job Dispatch API running on port 8080!"));
