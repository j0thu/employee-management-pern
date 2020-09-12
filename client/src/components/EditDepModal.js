import React, {useState, Fragment} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


const EditDepModal= (props)=>{
  const [departmentid, setdepartmentid]= useState("");
  const [departmentname, setDepartmentname] = useState("");
  const [snackbaropen, setsnackbaropen] = useState(false);
  const [snackbarmsg, setsnackbarmsg] = useState('');

    const snackBarClose = (event)=>{
      setsnackbaropen(false);
    }

    const updateForm = async(e)=>{
        e.preventDefault();
        try {
            const DepartmentID= departmentid;
            const DepartmentName = departmentname;
            const response = await fetch('http://localhost:5000/department', {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    DepartmentID:DepartmentID,
                    DepartmentName: DepartmentName
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
                Edit Department Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='container'>
                <Row>
                  <Col sm={6}>
                    <Form onSubmit = {updateForm}>
                    <Form.Group controlID = "DepartmentID">
                        <Form.Label>Department ID</Form.Label>
                        <Form.Control type="text" name="DepartmentID" required disabled placeholder="Department ID" defaultValue = {props.depid} />
                      </Form.Group>

                      <Form.Group controlID = "DepartmentName">
                        <Form.Label>Department Name</Form.Label>
                        <Form.Control type="text" name="DepartmentName" required placeholder="Department Name" defaultValue={props.depname} onChange={e=>{
                          setDepartmentname(e.target.value);
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

export default EditDepModal;