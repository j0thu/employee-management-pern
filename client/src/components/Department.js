import React, { Component } from 'react'
import {Table} from 'react-bootstrap'; 

export default class Department extends Component {

    constructor(props){
        super(props);
        this.state = {deps: []};
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
        return (
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
        )
    }
}
