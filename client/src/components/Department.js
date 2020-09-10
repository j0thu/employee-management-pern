import React, { Component, Fragment } from 'react'
import {Table} from 'react-bootstrap'; 
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import AddDepModal from './AddDepModal';

export default class Department extends Component {

    constructor(props){
        super(props);
        this.state = {deps: [], addModalShow: false}; //Add modal will initially be false
    }

    async refreshList(){
        try {
            const response = await fetch('http://localhost:5000/department');
            const jsonData = await response.json();
            this.setState({deps: jsonData});
        } catch(err) {
            console.log(err);
        }
    }

    componentDidMount(){ //After all the components for this particular page is loaded, this.refreshList() will be called
        this.refreshList();
    }

    render() {
        const {deps} = this.state; //to use the state, you should do this
        let addModalClose = ()=> this.setState({addModalShow: false}) //While closing the modal, we set it to false
        return (
            <Fragment>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Department ID</th>
                        <th>Department Name</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                    <tr key={dep.departmentID}>
                    <td>{dep.departmentID}</td>
                    <td>{dep.departmentName}</td>
                    </tr>   
                    )}
                </tbody>    
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}>Add Department</Button>
            </ButtonToolbar> 
            
            <AddDepModal show={this.state.addModalShow} onHide = {addModalClose}/>  { /*The component will be shown if the addModalShow is true else, its false*/}
            </Fragment>
        )
    }
}
