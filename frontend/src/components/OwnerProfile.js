import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container,Alert, Col, Form, Button, ButtonGroup } from 'react-bootstrap'
import URL from '../config'


class OwnerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            name: "",
            email_id: "",
            password: "",
            user_image: "",
            res_name: "",
            res_cuisine: "",
            res_zip_code: "",
            authFlag : null
        };
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillMount() {
        const data = {
            user_id: localStorage.getItem("user_id")
        };
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/profile/restaurantget`, data)
            .then(response => {
                console.log(response);
                this.setState({
                    user_id: response.data.user_id,
                    name: response.data.name,
                    email_id: response.data.email,
                    user_image: response.data.user_image,
                    address: response.data.address,
                    phone_number: response.data.phone_number,
                    res_name: response.data.restaurant.res_name,
                    res_cuisine: response.data.restaurant.res_cuisine,
                    res_zip_code: response.data.restaurant.res_zip_code,
                });
                localStorage.setItem("name", this.state.name);
            })
            .catch(error => {
                console.log(error);
            });
    }

    onUpdate = (e) => {
        //prevent page from refresh
        e.preventDefault();
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        let data = {
            user_id: localStorage.getItem("user_id"),
            email_id: this.state.email_id,
            name: this.state.name,
            password: this.state.password,
            address: this.state.address,
            phone_number: this.state.phone_number,
            res_name: this.state.res_name,
            res_cuisine: this.state.res_cuisine,
            res_zip_code: this.state.res_zip_code
        };
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/profile/restaurantupdate`, data)
            .then(response => {
                console.log(`inside ok`);
                this.setState({
                    authFlag : true
                })
            })
            .catch(error => {
                this.setState({
                    authFlag : false
                })
                console.log(`inside error`);
            });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let dispMsg = "";
        if(this.state.authFlag === true){
            dispMsg =(
                <Alert variant='success'>
                Update successful
            </Alert>)
        }
        else if(this.state.authFlag === false){
            dispMsg =(
                <Alert variant='danger'>
                Update Failed
            </Alert>)
        }


        return (<div>

            <Container fluid={true}>
                    <Col>
                    <h4>Owner Profile</h4>
                        <br />
                        <Form onSubmit={this.onUpdate} >
                            <Form.Row>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control autoFocus={true} name="name"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.name} placeholder="John Snow" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>Restaurant Name</Form.Label>
                                    <Form.Control name="res_name"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.res_name} placeholder="inchins" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="RB.password">
                                    <Form.Label>Cuisine</Form.Label>
                                    <Form.Control name="res_cuisine"
                                        onChange={this.onChange}
                                        value={this.state.res_cuisine} type="text" placeholder="Cuisine" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"
                                        name="email_id"
                                        value={this.state.email_id}
                                        disabled placeholder="email" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="RB.password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"
                                        name="password"
                                        onChange={this.onChange}
                                        placeholder="New Password" />
                                </Form.Group>
                            </Form.Row>


                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control type="text"
                                        name="res_zip_code"
                                        onChange={this.onChange}
                                        value={this.state.res_zip_code}
                                        placeholder="90000"
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text"
                                        name="address"
                                        onChange={this.onChange}
                                        value={this.state.address}
                                        placeholder="Street 1" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text"
                                        name="phone_number"
                                        onChange={this.onChange}
                                        value={this.state.phone_number}
                                        placeholder="9000010000"
                                    />
                                </Form.Group>
                            </Form.Row>
                            {dispMsg}
                            <ButtonGroup aria-label="Third group">
                                <Button type="submit">
                                Update Details</Button>
                            </ButtonGroup>

                            <ButtonGroup aria-label="Fourth group">
                            <Link to="/home"><Button variant="warning">Cancel</Button></Link>
                            </ButtonGroup>
                        </Form>
                    </Col>
            </Container>
        </div>











        )
    }
}
export default OwnerProfile;