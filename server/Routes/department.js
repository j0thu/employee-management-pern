const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/department', async(req, res)=>{
    try {
        const dep_details = await pool.query('SELECT * FROM public.tbldepartment');
        res.json(dep_details.rows);
    }
    catch (err) {
        console.error(err);
    }
})

router.post('/department', async(req, res)=>{
    try {
        const {department} = req.body;
        const newDepartment = await pool.query('INSERT INTO public.tbldepartment (departmentname) VALUES($1) RETURNING *', [department]);
        res.json(newDepartment.row);
    }
    catch(err){
        console.error(err);
    }
})

router.put('/department', async(req, res)=>{
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

router.delete('/department/:id', async(req, res)=>{
    const {id} = req.params;
    try {
        const deleteDep = await pool.query('DELETE FROM public.tbldepartment WHERE departmentid = $1', [id]);
        res.json('Deleted Successfully');
    }
    catch(err){
        console.error(err);
    }
})

module.exports = router;
