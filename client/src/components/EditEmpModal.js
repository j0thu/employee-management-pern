import React, {useState, Fragment, useEffect} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


const EditEmpModal= (props)=>{
    
    const[departmentdetails, setdepartmentdetails] = useState([]);
    const [selectDepartment, setselectDepartment] = useState("Select Department");
    
    const [employeename, setemployeename] = useState(props);
    const [employeedep, setemployeedep] = useState(props);
    const [employeemail, setemployeemail] = useState(props);
    const [employeedoj, setemployeedoj] = useState(props);

    const [snackbaropen, setsnackbaropen] = useState(false);
    const [snackbarmsg, setsnackbarmsg] = useState('');
  
    
      const snackBarClose = (event)=>{
        setsnackbaropen(false);
      }
      useEffect(()=>{
        setemployeename(props.empname);
      }, [props.empname])
      useEffect(()=>{
        setemployeedep(props.empdep);
      }, [props.empdep])
      useEffect(()=>{
        setemployeemail(props.empmail);
      }, [props.empmail])
      useEffect(()=>{
        setemployeedoj(props.empdoj);
      }, [props.empdoj])

      useEffect(()=>{
        fetch('http://localhost:5000/department')
        .then(response => response.json())
        .then(data=>{
          setdepartmentdetails(data);
        })
      }, []);
      
      const updateForm = async(e)=>{
          e.preventDefault();
          try {
              const response = await fetch('http://localhost:5000/employee', {
                  method: "PUT",
                  headers: {"Content-Type":"application/json"},
                  body: JSON.stringify({
                      EmployeeID:props.empid,
                      EmployeeName: employeename,
                      EmployeeDep:employeedep,
                      EmployeeMail:employeemail,
                      EmployeeDoj:employeedoj
                  }),
              });
              setsnackbaropen(true);
              setsnackbarmsg('Updated Successfully');
          } 
          catch (err) {
              console.error(err);
              setsnackbaropen(true);
              setsnackbarmsg('Error Updating Data');
          }
      }
  
      return (
                <Fragment>
                <Snackbar anchorOrigin = {{vertical:'bottom', horizontal:'center'}} 
                  open = {snackbaropen}
                  autoHideDuration = {3000}
                  onClose = {snackBarClose} 
                  message={snackbarmsg}
                  action={[<IconButton key="close" aria-label="Close" color="inherit" onClick={snackBarClose}> X </IconButton>]}/>
              <Modal
                  {...props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                 >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Edit Employee Details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='container'>
                  <Row>
                    <Col sm={6}>
                      <Form onSubmit = {updateForm}>
                      <Form.Group controlID = "EmployeeID">
                          <Form.Label>Department ID</Form.Label>
                          <Form.Control type="text" name="EmployeeID" required disabled placeholder="Employee ID" defaultValue = {props.empid} />
                        </Form.Group>
  
                        <Form.Group controlID = "EmployeeName">
                          <Form.Label>Employee Name</Form.Label>
                          <Form.Control type="text" name="EmployeeName" required placeholder="Employee Name" defaultValue={props.empname} onChange={e=>{
                            setemployeename(e.target.value);
                          }}/>
                        </Form.Group>

                        <Form.Group controlID = "EmployeeDepartment">
                          <Form.Label>Employee Department</Form.Label>
                          <Form.Control as ="select" onChange = {e=>{
                          setemployeedep(e.target.value);
                        }}>
                          <option>{props.empdep}</option>

                         {departmentdetails.map(dep=>
                            <option key = {dep.departmentid}>{dep.departmentname}</option>
                          )}
                        </Form.Control> 
                        </Form.Group>

                        <Form.Group controlID = "EmployeeMail">
                          <Form.Label>Employee Mail</Form.Label>
                          <Form.Control type="text" name="EmployeeMail" required placeholder="Employee Mail" defaultValue={props.empmail} onChange={e=>{
                            setemployeemail(e.target.value);
                          }}/>
                        </Form.Group>

                        <Form.Group controlID = "EmployeeDOJ">
                          <Form.Label>Employee Date of Join</Form.Label>
                          <Form.Control type="date" name="EmployeeDoj" required placeholder="Employee DOJ" defaultValue={props.empdoj} onChange={e=>{
                            setemployeedoj(e.target.value);
                          }}/>
                        </Form.Group>

                        <Form.Group>
                          <Button variant="secondary" type="submit" onClick={props.onHide}>Update</Button>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>    
                </div> 
              </Modal.Body>
              <Modal.Footer>
                <Button variant ="danger" onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
            </Fragment>
      )
  }
  
  export default EditEmpModal;