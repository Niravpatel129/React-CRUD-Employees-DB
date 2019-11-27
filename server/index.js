const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

mongoose.connect("mongodb://admin:dragon1@ds135983.mlab.com:35983/employees", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connection success to database!");
});

let employeeSchema = new Schema({
  id: Number,
  name: String,
  code: String,
  profession: String,
  color: String,
  city: String,
  branch: String,
  assigned: Boolean
});

let EmployeesDataBase = mongoose.model("employees", employeeSchema);
let employeess;

function updateEmplyees() {
  EmployeesDataBase.find(function(err, employees) {
    if (err) {
    } else {
      employeess = employees;
    }
  });
}

updateEmplyees();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

app.get("/api/employees", cors(corsOptions), (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200);
  res.send(JSON.stringify(employeess, null, 2));
});

app.delete("/api/deleteEmployee", cors(corsOptions), (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  let employeeID = req.query.employeeId;

  EmployeesDataBase.deleteOne(
    {
      _id: employeeID
    },
    function(err) {
      if (err) return handleError(err);
    }
  ).then(() => {
    updateEmplyees();
    res.send(200);
  });
});

app.post("/api/addEmployee", cors(corsOptions), (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(req.body);
  let employeeInfo = req.body;
  let newEmployee = new EmployeesDataBase({
    id: employeeInfo.id,
    name: employeeInfo.name,
    code: employeeInfo.code,
    profession: employeeInfo.profession,
    color: employeeInfo.color,
    city: employeeInfo.city,
    branch: employeeInfo.branch,
    assigned: employeeInfo.assigned
  });

  newEmployee.save(function(err, book) {
    if (err) return console.error(err);

    updateEmplyees();
    res.send(200);
    console.log(book.name + " saved to bookstore collection.");
  });
});

app.listen(8080, () => console.log("Job Dispatch API running on port 8080!"));
