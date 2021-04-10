import React,{Component} from "react";
import {Container,Table,Button} from 'react-bootstrap';
import {ModalContainer} from './modal';
import {axiosGET,axiosPUT} from './axios';

export class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            userDataList : [],
            toggleModal : false,
            selectedUser : {}
        }
        this.generateData = this.generateData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.editModal = this.editModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        if(this.state.userDataList.length == 0){
            this.generateData();
        }
    }

    generateData = () =>{
        axiosGET("/api/generateData",{},{}).then(resolve =>{
            this.setState({userDataList : [...resolve.data]});
        }).catch(reject => {
            console.log(reject.msg);
        });
    }


    editModal = (event) =>{
        let id = event.target.id;
        let selectedData = {};
        this.state.userDataList.map(user => {
            if(id == user.id){
                selectedData = {...user};
            }
        });
        this.setState({toggleModal : true,selectedUser : {...selectedData}});
    }

    closeModal = () =>{
        this.setState({toggleModal : false,selectedUser : {}});
    }

    updateUser = () =>{
        axiosPUT("/api/updateData",this.state.selectedUser,{},{}).then(resolvedResult => {
            let selUser = resolvedResult.data;
            let users = this.state.userDataList;
            users.map(user => {
                if(user.id == selUser.id){
                    user.name = selUser.name;
                    user.email = selUser.email;
                    user.gender = selUser.gender;
                    user.status = selUser.status;
                }
            });
            this.setState({userDataList : [...users]});
            this.closeModal();
        }).catch(rejectedResult => {
            console.log(rejectedResult.msg);
            this.closeModal();
        });
    }

    onChange = (event) =>{
        let selectedUser = this.state.selectedUser;
        switch(event.target.id){
            case "name" :   selectedUser.name = event.target.value;
                            break;
            case "email" :  selectedUser.email = event.target.value;
                            break;                        
            case "status" : selectedUser.status = event.target.value;
                            break;                    
            case "gender" : selectedUser.gender = event.target.value;
                            break;    
        }
        this.setState({selectedUser : selectedUser});
    }

    render(){
        return (<Container fluid>
                    <h1>TensorGo Project</h1>
                    <Table>
                        <thead>
                            <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.userDataList.map(user => {
                                return (
                                    <tr key = {user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.status}</td>
                                        <td><Button variant="warning" onClick={this.editModal} id = {user.id}>Edit</Button></td>  
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                    {this.state.toggleModal && <ModalContainer 
                                    closeModal={this.closeModal} 
                                    userData = {this.state.selectedUser} 
                                    updateUser = {this.updateUser} 
                                    onChange = {this.onChange} 
                                    openModal = {this.state.toggleModal}/>
                    }
                </Container>);
    }
}