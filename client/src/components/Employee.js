import React, { Component, Fragment } from 'react'
import {Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import AddEmpModal from './AddEmpModal';
import EditEmpModal from './EditEmpModal';

export default class Employee extends Component {

    constructor(props){
        super(props);
        this.state = {emps: [], addModalShow: false, editModalShow: false, empname:'', empid:'', empdep:'', empmail:'', empdoj:''}
    }

    async refreshList(){
        try {
            const response = await fetch('http://localhost:5000/employee');
            const jsonData = await response.json();
            this.setState({emps: jsonData});
        } 
        catch(err) {
            console.log(err);
        }
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are You Sure You Want To Delete?')){
            fetch(`http://localhost:5000/employee/${empid}`, {
                method: 'DELETE',
                headers:{'Content-Type':'application/json'},
            })
        }
    }

    render() {
        // const {emps, empid, empname, empdep, empdoj, empmail} = this.state; //to use the state, you should do this
        const {emps} = this.state;
        let addModalClose = ()=> this.setState({addModalShow: false}) //While closing the modal, we set it to false
        let editModalClose = ()=> this.setState({editModalShow: false});
        return (
            <Fragment>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Mail ID</th>
                        <th>Date Of Join</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {emps.map(emp=>
                    <tr key={emp.employeeid}>
                    <td>{emp.employeeid}</td>
                    <td>{emp.employeename}</td>
                    <td>{emp.employeedep}</td>
                    <td>{emp.employeemail}</td>
                    <td>{emp.employeedoj}</td>

                    <td>
                        <ButtonToolbar>
                            {/*Edit Button*/}
                            <Button className="mr-2" variant ="info" 
                            onClick = {()=> this.setState({editModalShow:true, empid:emp.employeeid, empname:emp.employeename, empdep: emp.employeedep,empmail: emp.employeemail, empdoj: emp.employeedoj })}>
                                Edit
                            </Button>
                            {/*Delete Button*/}
                            <Button className="mr-2" variant ="danger" onClick = {()=> this.deleteEmp(emp.employeeid)}>
                                Delete
                            </Button>
                            {/*Edit Component*/ }
                            <EditEmpModal show={this.state.editModalShow} onHide = {editModalClose} 
                            empid = {this.state.empid} empname = {this.state.empname} empdep = {this.state.empdep} 
                            empmail = {this.state.empmail} empdoj = {this.state.empdoj}/> {/*These are from this.state.depid/depname*/}
                        </ButtonToolbar>
                    </td>
                    </tr>   
                    )}
                </tbody>    
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}>Add Employee</Button>
            </ButtonToolbar> 
            
            <AddEmpModal show={this.state.addModalShow} onHide = {addModalClose}/>  { /*The component will be shown if the addModalShow is true else, its false*/}
            </Fragment>
        )
    }
}
                                                                         