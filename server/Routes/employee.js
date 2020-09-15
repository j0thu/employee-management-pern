const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/employee', async(req, res)=>{
    try {
        const emp_details = await pool.query('SELECT * FROM public.tblemployee');
        res.json(emp_details.rows);
    }
    catch(err) {
        console.error(err);    
    }
})

router.post('/employee', async(req, res)=>{
    try {
        const {employeename, employeedep, employeemail, employeedoj} = req.body;
        const newEmployee = await pool.query('INSERT INTO public.tblemployee (employeename, employeedep, employeemail, employeedoj) VALUES ($1, $2, $3, $4)', [employeename, employeedep, employeemail, employeedoj]);
        res.json(newEmployee.row);

    } catch (err) {
        console.error(err);
    }
})

router.put('/employee', async(req, res)=>{
    try {
        const {EmployeeID, EmployeeName, EmployeeDep, EmployeeMail, EmployeeDoj} = req.body;
        const updateEmp = await pool.query('UPDATE public.tblemployee SET employeename = $1, employeedep = $2, employeemail=$3, employeedoj = $4 WHERE employeeid = $5', [EmployeeName, EmployeeDep, EmployeeMail, EmployeeDoj, EmployeeID]);
        res.json('Updated The Data');
    } catch (err) {
        console.error(err);
    }
})

router.delete('/employee/:id', async(req, res)=>{
    const {id} = req.params;
    try {
        const deleteEmp = await pool.query('DELETE FROM public.tblemployee WHERE employeeid = $1', [id]);
        res.json('Deleted Successfully');
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;