const express = require('express');
const app = express();
const cors = require('cors');

const pool = require('./db');

app.use(cors());
app.use(express.json());

//Importing Routes
const departmentRoute = require('./Routes/department');
const employeeRoute = require('./Routes/employee');

//Route Usage
app.use('/', departmentRoute);
app.use('/', employeeRoute);

PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
})
