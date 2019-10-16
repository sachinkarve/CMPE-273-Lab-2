import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import GrubhubCover from '../images/grubhub.png'
import { Form, Alert, Col, Row, Button } from 'react-bootstrap';
import URL from '../config'


class OwnerSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email_id: "",
            password: "",
            res_name: "",
            res_cuisine: "",
            phone_number: "",
            address: "",
            res_zip_code: "",
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
            res_name: this.state.res_name,
            phone_number: this.state.phone_number,
            res_cuisine: this.state.res_cuisine,
            res_zip_code: this.state.res_zip_code,
            address: this.state.address,
        }

        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/signup/owner`, data)
            .then(response => {
                console.log(`data saved`);
                console.log("Status Code : ", response.status);

                this.setState({
                    authFlag: true
                })
            })
            .catch(err => {
                console.log(`data not saved`);
                console.log(err);
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
        else if (this.state.authFlag === false) {
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

                                    <Form.Group as={Col} controlId="RB.password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control onChange={this.onChangeHandler} required={true} type="password" name="password" placeholder="Password" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>Restaurant Name</Form.Label>
                                        <Form.Control onChange={this.onChangeHandler} required={true} type="text" name="res_name" placeholder="Inchins" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="RB.password">
                                        <Form.Label>Restaurant Cuisine</Form.Label>
                                        <Form.Control onChange={this.onChangeHandler} required={true} type="text" name="res_cuisine" placeholder="Ethiopian" />
                                    </Form.Group>
                                </Form.Row>


                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control name="address" onChange={this.onChangeHandler} required={true} placeholder="1 Washington square" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control name="phone_number" onChange={this.onChangeHandler} required={true} placeholder="9845566878" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control name="res_zip_code" type="text" onChange={this.onChangeHandler} required={true} placeholder="900000" />
                                    </Form.Group>
                                </Form.Row>
                                {invalidCredentials}


                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                <Link to="/login"><Button variant="link">Login</Button></Link>
                                <Link to="/customersignup"><Button variant="link">Customer Signup</Button></Link>

                            </Form>
                        </Col>
                    </Row>
            </div>
        )
    }
}
//export Login Component
export default OwnerSignup