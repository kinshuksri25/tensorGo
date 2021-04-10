import React,{ useState,useEffect} from "react";
import {Table,Container,Button} from "react-bootstrap";
import {ModalContainer} from './modal';
import {axiosPUT} from './axios';

export const TableComponent = (props) =>{

    const [openModal,toggleModal] = useState(false);
    const [userData,updateUserData] = useState({});

    const editModal = (event) =>{
        let id = event.target.id;
        let selectedData = {};
        props.userData.map(user => {
            if(id == user.id){
                selectedData = {...user};
            }
        });
        updateUserData({...selectedData});
        toggleModal(true);
    }

    const closeModal = () =>{
        toggleModal(false);
        updateUserData({});
    }

    const updateUser = () =>{
        axiosPUT("/api/updateData",userData,{},{}).then(resolvedResult => {
            let user = userData;
            closeModal();
            props.updateDataHandler(user);
        }).catch(rejectedResult => {
            closeModal();
        });
    }

    const onChange = (event) =>{
        switch(event.target.id){
            case "name" : updateUserData({...userData,name:event.target.value});
                        break;
            case "email" : updateUserData({...userData,email:event.target.value});
                        break;                        
            case "status" : updateUserData({...userData,status:event.target.value});
                        break;                    
            case "gender" : updateUserData({...userData,gender:event.target.value});
                        break;    
        }
    }

    return (
        <Container fluid> 
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
                    props.userData.map(user => {
                        return (
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td><Button variant="warning" onClick={editModal} id = {user.id}>Edit</Button></td>  
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            {openModal && <ModalContainer closeModal={closeModal} userData = {userData} updateUser = {updateUser} onChange = {onChange} openModal = {openModal}/>}
        </Container>
    );
}