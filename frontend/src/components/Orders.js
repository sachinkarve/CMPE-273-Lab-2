import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {  Alert, Container} from "react-bootstrap";
import Navbar from './Navbar.js';

class Orders extends Component {
    render() {
       let redirectVar = null
       if (!localStorage.getItem('token')) {
        redirectVar = <Redirect to="/" />

       }
        return (
            <div>
                {redirectVar}
                <Navbar /> <br />
                <Container>
                    <center>
                    <Alert variant="success">Order placed successfully!</Alert>
                        <br /><br />
                    </center>
                </Container>
            </div >
        )
    }
}
export default Orders;