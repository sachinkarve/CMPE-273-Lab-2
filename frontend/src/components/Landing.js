import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import Navbar from './Navbar.js';
import GrubhubCover from '../images/grubhub.png'
import { Row, Col, Button } from 'react-bootstrap'



class Landing extends Component {

    render() {
        let redirectvar = null;
        //let homeRender = null;
        if (!localStorage.getItem('token')) {
            redirectvar = <Redirect to="/" />
        }



        return (
            <div>
                {redirectvar}
                {Navbar}
                <Row>
                    <Col><img src={GrubhubCover} alt="not found"></img></Col>
                    <Col>
                        <Row><br/><br/><br/><br/><br/><br/><br/><br/><br/></Row>
                        <Row sm="12" md={{ size: 6, offset: 3 }}>


                                   <h1> Welcome to Grubhub</h1>

                            <Link to="/login"><Button variant="link"><h3>Login</h3></Button></Link>
                        </Row>
                        <Row></Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Landing
