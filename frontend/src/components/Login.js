import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import GrubhubCover from '../images/grubhub.png'
import URL from '../config'

import { Alert, Form, Row, Col, Button } from 'react-bootstrap';
var jwt_decode = require('jwt-decode');


//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            user_id : "",
            email_id: "",
            password: "",
            errorFlag: "",
            is_owner: "",
            token : null
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitLogin = (e) => {
        //prevent page from refresh
        console.log(`inside submitlogin`)
        e.preventDefault();
        const data = {
            email_id: this.state.email_id,
            password: this.state.password
        }
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/login`, data)
            .then(response => {
                this.setState({
                    errorFlag: null,
                    token : response.data.token
                 });

            }).catch(err => {
                console.log(`inside 401`);
                this.setState({
                    errorFlag: true,
                    token : null
                });
            });
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        let invalidCredentials = null;
        if (this.state.token) {
            localStorage.setItem("token", this.state.token);

            var decoded = jwt_decode(this.state.token.split(' ')[1]);
            localStorage.setItem("name", decoded.name);
            localStorage.setItem("email_id", decoded.email);
            localStorage.setItem("is_owner", decoded.is_owner);

            redirectVar = <Redirect to="/home" />
        }
        else if (this.state.errorFlag) {
            invalidCredentials = (
                <Alert variant='danger'>
                    Invalid Credentials
                </Alert>)
        }


        return (
            <div>
                {redirectVar}
                
                    <Row>
                        <Col><img src={GrubhubCover} alt="not found"></img></Col>
                        <Col><br />
                            <Form onSubmit={this.submitLogin}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control autoFocus={true} required={true} type="email" name="email_id" onChange={this.onChangeHandler} placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        Your email is safe with us.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" required={true} onChange={this.onChangeHandler} placeholder="Enter password" />
                                </Form.Group>
                                {invalidCredentials}

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                
                                <Link to="/customersignup"><Button variant="link">Customer Signup</Button></Link>
                                <Link to="/ownersignup"><Button variant="link">Owner Signup</Button></Link>

                            </Form>
                        </Col>
                    </Row>
                
            </div>
        )
    }
}
//export Login Component
export default Login