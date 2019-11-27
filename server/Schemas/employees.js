const mongoose = require("mongoose");
let Schema = mongoose.Schema;

module.exports = function employeeSchema() {
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
  return employeeSchema;
};
