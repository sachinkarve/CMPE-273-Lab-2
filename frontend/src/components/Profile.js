import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Navbar from './Navbar.js'
import CustomerProfile from './CustomerProfile.js';
import OwnerProfile from './OwnerProfile.js';
import FileUpload from './FileUpload.js'
import { Row, Container, Col } from 'react-bootstrap';

class Profile extends Component {

    render() {
        let redirectvar = null;
        let profileRender = null;
        if (localStorage.getItem('token')) {
            if (localStorage.getItem("is_owner") === "1") {
                profileRender = <OwnerProfile />
            }
            else {
                profileRender = <CustomerProfile />
            }
        }
        else {
            redirectvar = <Redirect to="/login" />
        }

        return (
            <div>
                {redirectvar}
                <Navbar />

                <Container fluid={true}>
                    <Row>
                        <Col xs={4} style={{ margin:"1%" }}> 
                        <br /><br /><br />            
                        <FileUpload />
                        </Col>
                        <Col>
                            {profileRender}
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Profile
