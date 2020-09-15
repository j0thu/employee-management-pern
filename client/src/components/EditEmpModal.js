import React, {useState, Fragment, useEffect} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


const EditEmpModal= (props)=>{
    const [employeeid, setemployeeid]= useState("");
    const [employeename, setemployeename] = useState("");
    const [employeedep, setemployeedep] = useState("");
    const [employeemail, setemployeemail] = useState("");
    const [employeedoj, setemployeedoj] = useState("");

    const [snackbaropen, setsnackbaropen] = useState(false);
    const [snackbarmsg, setsnackbarmsg] = useState('');
  
      const snackBarClose = (event)=>{
        setsnackbaropen(false);
      }
  
      useEffect(()=>{
        setemployeeid(props.empid);
        // setemployeename(props.empname);
        // setemployeedep(props.empdep);
        // setemployeemail(props.empmail);
        // setemployeedoj(props.empdoj);
      }, []);
  
  
      const updateForm = async(e)=>{
          e.preventDefault();
          try {
              const EmployeeID= employeeid;
              const EmployeeName = employeename;
              const EmployeeDep = employeedep;
              const EmployeeMail = employeemail;
              const EmployeeDoj = employeedoj;
              const response = await fetch('http://localhost:5000/employee', {
                  method: "PUT",
                  headers: {"Content-Type":"application/json"},
                  body: JSON.stringify({
                      EmployeeID:EmployeeID,
                      EmployeeName: EmployeeName,
                      EmployeeDep:EmployeeDep,
                      EmployeeMail:EmployeeMail,
                      EmployeeDoj:EmployeeDoj
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
  
                        <Form.Group controlID = "DepartmentName">
                          <Form.Label>Employee Name</Form.Label>
                          <Form.Control type="text" name="EmployeeName" required placeholder="Employee Name" defaultValue={props.empname} onChange={e=>{
                            setemployeename(e.target.value);
                          }}/>
                        </Form.Group>

                        <Form.Group controlID = "EmployeeDepartment">
                          <Form.Label>Employee Department</Form.Label>
                          <Form.Control type="text" name="EmployeeDep" required placeholder="Employee Department" defaultValue={props.empdep} onChange={e=>{
                            setemployeedep(e.target.value);
                          }}/>
                        </Form.Group>

                        <Form.Group controlID = "EmployeeMail">
                          <Form.Label>Employee Mail</Form.Label>
                          <Form.Control type="text" name="EmployeeMail" required placeholder="Employee Mail" defaultValue={props.empmail} onChange={e=>{
                            setemployeemail(e.target.value);
                          }}/>
                        </Form.Group>

                        <Form.Group controlID = "EmployeeDOJ">
                          <Form.Label>Employee Date of Join</Form.Label>
                          <Form.Control type="text" name="EmployeeDoj" required placeholder="Employee DOJ" defaultValue={props.empdoj} onChange={e=>{
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