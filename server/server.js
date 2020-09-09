const express = require('express');
const app = express();
const cors = require('cors');

const pool = require('./db');

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    try {
        res.send('Home')
    }
    catch(err){
        console.error(err);    
    }
})

app.get('/department', async(req, res)=>{
    try {
        const dep_details = await pool.query('SELECT * FROM tbldepartment');
        res.json(dep_details.rows);
    }
    catch (err) {
        console.error(err);
    }
})

app.get('/employee', (req, res)=>{
    res.send('Employees')
})

PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
})
