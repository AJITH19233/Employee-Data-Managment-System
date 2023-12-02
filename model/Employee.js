const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Create a schema for the Employee collection
const employeeSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Position: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  Salary: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;