const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const mongooseSetup = require("./mongooseSetup/mongooseSetup.js");
const employeeSchemaTemplate = require("./Schemas/employees");

mongooseSetup();

const employeeSchema = employeeSchemaTemplate();

const EmployeesDataBase = mongoose.model("employees", employeeSchema);
let employeess;

function updateEmplyees() {
  EmployeesDataBase.find(function(err, employees) {
    if (err) {
      console.log(err);
    } else {
      employeess = employees;
    }
  });
}

updateEmplyees();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
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
    res.sendStatus(200);
  });
});

app.post("/api/addEmployee", cors(corsOptions), (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const employeeInfo = req.body;
  const newEmployee = new EmployeesDataBase({
    id: employeeInfo.id,
    name: employeeInfo.name,
    code: employeeInfo.code,
    profession: employeeInfo.profession,
    color: employeeInfo.color,
    city: employeeInfo.city,
    branch: employeeInfo.branch,
    assigned: employeeInfo.assigned
  });

  newEmployee.save(function(err, employee) {
    if (err) return console.error(err);

    updateEmplyees();
    res.sendStatus(200);
    console.log(employee.name + " added to the database!");
  });
});

app.put("/api/updateEmployee", cors(corsOptions), (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const employeeInfo = req.body;

  EmployeesDataBase.findByIdAndUpdate(
    { _id: employeeInfo._id },
    {
      $set: {
        _id: employeeInfo._id,
        id: employeeInfo.id,
        name: employeeInfo.name,
        code: employeeInfo.code,
        profession: employeeInfo.profession,
        city: employeeInfo.city,
        branch: employeeInfo.branch,
        color: employeeInfo.color
      }
    }
  )
    .then(data => {
      updateEmplyees();

      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
    });
});

app.put("/api/toggleAssigned", cors(corsOptions), (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const employeeInfo = req.body;
  EmployeesDataBase.findByIdAndUpdate(
    { _id: employeeInfo._id },
    {
      $set: { assigned: req.body.toEnableOrDisable }
    }
  )
    .then(data => {
      updateEmplyees();
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(8080, () => console.log("Job Dispatch API running on port 8080!"));
