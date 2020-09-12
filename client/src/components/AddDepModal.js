import React, {useState } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


const AddDepModal = (props)=>{

  const [department, setDepartment] = useState("");

  const onSubmitForm = async(e)=>{
      e.preventDefault();
      try {
          const body = {department};
          const response = await fetch("http://localhost:5000/department", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(body),
          });
          // console.log(response);
          window.location = "/department";
      } catch (err) {
          console.error(err);
      }
  }
        return (
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
                      <Form.Group controlID = "DepartmentName">
                         <Form.Label>DepartmentName</Form.Label>
                         <Form.Control type="text" name="DepartmentName" required placeholder="Department Name" onChange={e=>{
                           setDepartment(e.target.value);
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
  
        )
    }

export default AddDepModal;