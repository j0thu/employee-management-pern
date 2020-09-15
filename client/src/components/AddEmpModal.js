import React, {useState, Fragment, useEffect } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const AddEmpModal = (props)=>{

  const [employeename, setemployeename] = useState("");
  const [employeedep, setemployeedep] = useState("");
  const [employeemail, setemployeemail] = useState("");
  const [employeedoj, setemployeedoj] = useState("");
  const [snackbaropen, setsnackbaropen] = useState(false);
  const [snackbarmsg, setsnackbarmsg] = useState('');

  const [departmentdetails, setdepartmentdetails] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/department')
    .then(response => response.json())
    .then(data=>{
      setdepartmentdetails(data);
    })
  })

  const snackBarClose = (event)=>{
    setsnackbaropen(false);
  }

  const onSubmitForm = async(e)=>{
      e.preventDefault();
      try {
          const body = {employeename,employeedep, employeemail, employeedoj};
          const response = await fetch("http://localhost:5000/employee", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(body),
          });
          setsnackbaropen(true);
          setsnackbarmsg('Added Successfully');
          // console.log(response);
          // window.location = "/department";
      } catch (err) {
          console.error(err);
          setsnackbaropen(true);
          setsnackbarmsg('Error Adding Details');
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
                Add Department Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='container'>
                <Row>
                  <Col sm={6}>
                    <Form onSubmit = {onSubmitForm}>
                      <Form.Group controlID = "EmployeeName">
                         <Form.Label>Employee Name</Form.Label>
                         <Form.Control type="text" name="EmployeeName" required placeholder="Employee Name" onChange={e=>{
                           setemployeename(e.target.value);
                         }}/>
                      </Form.Group>

                      <Form.Group controlID = "EmployeeDep">
                         <Form.Label>Employee Department</Form.Label>
                         <Form.Control type="text" name="EmployeeDep" required placeholder="Employee Department" onChange={e=>{
                           setemployeedep(e.target.value);
                         }}/>
                      </Form.Group>

                      <Form.Group controlID = "EmployeeMail">
                         <Form.Label> E-Mail </Form.Label>
                         <Form.Control type="text" name="EmployeeDep" required placeholder="Employee Department" onChange={e=>{
                           setemployeemail(e.target.value);
                         }}/>
                      </Form.Group>

                      <Form.Group controlID = "EmployeeDoj">
                         <Form.Label>Date of Join</Form.Label>
                         <Form.Control type="text" name="EmployeeDoj" required placeholder="Date Of Join" onChange={e=>{
                           setemployeedoj(e.target.value);
                         }}/>
                      </Form.Group>

                      <Form.Group>
                        <Button variant="secondary" type="submit" onClick={props.onHide}>Add</Button>
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

export default AddEmpModal;