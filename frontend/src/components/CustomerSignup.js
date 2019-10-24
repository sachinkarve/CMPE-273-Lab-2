import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import GrubhubCover from '../images/grubhub.png'
import { Form, Alert, Col, Row, Button } from 'react-bootstrap';
import URL from '../config'

class CustomerSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email_id: "",
            password: "",
            phone_number: "",
            address: "",
            authFlag: ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitHandler = (e) => {
        e.preventDefault();

        const data = {
            name: this.state.name,
            email_id: this.state.email_id,
            password: this.state.password,
            phone_number: this.state.phone_number,
            address: this.state.address,
            is_owner: this.state.is_owner
        }

        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/signup/customer`, data)
            .then(response => {
                console.log(`data saved`);
                console.log("Status Code : ", response.status);

                this.setState({
                    authFlag: true
                })
            })
            .catch(err => {
                console.log(`data not saved`);
                this.setState({
                    authFlag: false
                });
            });
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        let invalidCredentials = null;
        if (this.state.authFlag) {
            redirectVar = <Redirect to="/login" />
        }
        else if(this.state.authFlag === false){
            invalidCredentials = ( <Alert variant='danger'>  Invalid Credentials or user exists!  </Alert>)
        }
        return (
            <div>
            {redirectVar}
 
                    <Row>
                        <Col><img src={GrubhubCover} alt="not found"></img></Col>
                        <Col><br />
                            <Form onSubmit={this.submitHandler} >
                                <Form.Row>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control autoFocus={true} required={true} onChange={this.onChangeHandler} name="name" placeholder="John Snow" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control onChange={this.onChangeHandler} required={true} type="email" name="email_id" placeholder="you@sjsu.edu" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control onChange={this.onChangeHandler} required={true} type="password" name="password" placeholder="Password" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control onChange={this.onChangeHandler} required={true} name="address" placeholder="1 Washington Square" />
                                </Form.Group>

                                <Form.Group controlId="phone_number">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control onChange={this.onChangeHandler} required={true} name="phone_number" placeholder="6000520000" />
                                </Form.Group>
                                {invalidCredentials}

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                <Link to="/login"><Button variant="link">Login</Button></Link>
                                <Link to="/ownersignup"><Button variant="link">Owner Signup</Button></Link>

                                <br />
                                <br />
                            </Form>
                        </Col>
                    </Row>
                
            </div>
        )
    }
}
//export Login Component
export default CustomerSignup