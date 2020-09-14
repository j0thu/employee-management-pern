import React, { Component, Fragment } from 'react'
import {Table} from 'react-bootstrap'; 
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import AddDepModal from './AddDepModal';
import EditDepModal from './EditDepModal';


export default class Department extends Component {

    constructor(props){
        super(props);
        this.state = {deps: [], addModalShow: false, editModalShow:false, depid:"", depname:""}; //Add modal will initially be false
    }

    async refreshList(){
        try {
            const response = await fetch('http://localhost:5000/department');
            const jsonData = await response.json();
            this.setState({deps: jsonData});
        } 
        catch(err) {
            console.log(err);
        }
    }

    componentDidMount(){ //After all the components for this particular page is loaded, this.refreshList() will be called
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm('Are You Sure You Want To Delete?')){
            fetch(`http://localhost:5000/department/${depid}`, {
                method: 'DELETE',
                headers:{'Content-Type':'application/json'},
            })
        }
    }

    render() {
        const {deps, depid, depname} = this.state; //to use the state, you should do this
        let addModalClose = ()=> this.setState({addModalShow: false}) //While closing the modal, we set it to false
        let editModalClose = ()=> this.setState({editModalShow: false});
        
        return (
            <Fragment>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Department ID</th>
                        <th>Department Name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                    <tr key={dep.departmentid}>
                    <td>{dep.departmentid}</td>
                    <td>{dep.departmentname}</td>
                    <td>
                        <ButtonToolbar>
                            {/*Edit Button*/}
                            <Button className="mr-2" variant ="info" onClick = {()=> this.setState({editModalShow:true, depid:dep.departmentid, depname:dep.departmentname})}>
                                Edit
                            </Button>
                            {/*Delete Button*/}
                            <Button className="mr-2" variant ="danger" onClick = {()=> this.deleteDep(dep.departmentid)}>
                                Delete
                            </Button>
                            <EditDepModal show={this.state.editModalShow} onHide = {editModalClose} depid = {this.state.depid} depname = {this.state.depname} /> {/*These are from this.state.depid/depname*/}
                        </ButtonToolbar>
                    </td>
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
