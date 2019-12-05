const mongoose = require("mongoose");

employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  code: String,
  profession: String,
  color: String,
  city: String,
  branch: String,
  assigned: Boolean
});

const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;
