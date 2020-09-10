import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


 class AddDepModal extends Component {
    constructor(props){
        super(props);
    }

    handleSubmit(event){
      event.preventDefault();
      alert(event.target.DepartmentName.value);
      
      }


    render() {
        return (
            <Modal
            {...this.props}
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
                    <Form onSubmit = {this.handleSubmit}>
                      <Form.Group controlID = "DepartmentName">
                         <Form.Label>DepartmentName</Form.Label>
                         <Form.Control type="text" name="DepartmentName" required placeholder="Department Name"/>
                      </Form.Group>
                      <Form.Group>
                        <Button variant="secondary" type="submit">Add</Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>    
              </div> 
            </Modal.Body>
            <Modal.Footer>
              <Button variant ="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
  
        )
    }
}

export default AddDepModal;