import React from "react";
import {Form,Button} from 'react-bootstrap';
import Modal from 'react-modal';

export const ModalContainer = (props) =>{

    const customStyles = {
        overlay:{
            background: 'rgba(255, 255, 255, 0.378)',
        },
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          heigth                : '70%',
          width                 : '50%',
          marginRight           : '-50%',
          paddingTop            : '1.1rem',
          borderRadius          : '5px',
          transform             : 'translate(-50%, -50%)'
        }
    };
    
    return (
        <Modal
        isOpen={props.openModal}
        style = {customStyles}>
            <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={props.userData.name} id = "name" onChange = {props.onChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={props.userData.email} id = "email" onChange = {props.onChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control type="text" value={props.userData.gender} id = "gender" onChange = {props.onChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" value={props.userData.status} id = "status" onChange = {props.onChange}/>
            </Form.Group>
            <Button onClick={props.closeModal}>Close</Button>
            <Button onClick={props.updateUser}>Submit</Button>
        </Modal>
    );
}