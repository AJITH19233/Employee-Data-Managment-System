const express=require('express');
const app=new express();
const cors=require('cors');
const Employee = require('./model/Employee');
const bodyParser = require('body-parser');


require('dotenv').config();//env file recognise

const PORT=process.env.PORT
//middlewares
app.use(cors({
    orgin:process.env.CORS_ORGIN||'*',
    Credential:true
}));
app.use
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT,()=>{
    console.log("App is listening "+PORT);
})

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://ajith1323:Achanamma@cluster0.3jql3om.mongodb.net/db?retryWrites=true&w=majority')

 .then(()=>{
     console.log('DB connected successfully');
 }).catch(()=>{
     console.log('Error! not connected');
 });


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//TODO: get single data from db  using api '/api/employeelist/:_id'
app.get('/api/employeelist/:_id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params._id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.send("Posted Succesfully,Check Atlas!!!");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});






//TODO: delete a employee data from db by using api '/api/employeelist/:_id'
app.delete('/api/employeelist/:_id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params._id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.send("Employee Deleted Successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist/:_id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params._id, req.body, { new: true });//net
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(updatedEmployee);
    //res.send("Updated succesfully");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
