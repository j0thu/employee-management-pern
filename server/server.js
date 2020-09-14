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
        const dep_details = await pool.query('SELECT * FROM public.tbldepartment');
        res.json(dep_details.rows);
    }
    catch (err) {
        console.error(err);
    }
})

app.post('/department', async(req, res)=>{
    try {
        const {department} = req.body;
        const newDepartment = await pool.query('INSERT INTO public.tbldepartment (departmentname) VALUES($1) RETURNING *', [department]);
        res.json(newDepartment.row);
    }
    catch(err){
        console.error(err);
    }
})

app.put('/department', async(req, res)=>{
    try {
        // console.log(req.body);
        const {DepartmentID, DepartmentName} = req.body;
        const updatedDep = await pool.query('UPDATE public.tbldepartment SET departmentname = $1 WHERE departmentid = $2', [DepartmentName, DepartmentID]);
        res.json('Updated The Data');
    }
    catch(err) {
       console.error(err);
    }
})

app.delete('/department/:id', async(req, res)=>{
    const {id} = req.params;
    try {
        const deleteDep = await pool.query('DELETE FROM public.tbldepartment WHERE departmentid = $1', [id]);
        res.json('Deleted Successfully');
    }
    catch(err){
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
