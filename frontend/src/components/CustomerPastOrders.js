import React, { Component } from 'react';
import axios from 'axios';
import { Card, Container, Col, Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import URL from '../config'
import Draggable from 'react-draggable'

//redux not required its just a get for now

class CustomerPastOrders extends Component {
    constructor(props) {
        super(props);
        this.getCompletedOrders();
    }

    getCompletedOrders = () => {
        axios.defaults.headers.common['authorization']= localStorage.getItem('token') 

        axios.get(`${URL}/orders/completedorders/${localStorage.getItem("user_id")}`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        completed_orders: response.data
                    });
                    console.log(response.data);
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    this.setState({
                        message: err.response.data
                    });
                }
            });
    };

    render() {
        let message = null;
        let orders = [];
        let orderCards = null;

        if (this.state && this.state.completed_orders) {
            orders = this.state.completed_orders;
            if (orders.length > 0) {
                orderCards = orders.map(order => {
                    return (
                        <Draggable>
                        <Card style={{ width: "60rem", margin: "4%" }}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Title>{order.restaurant.res_name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{order._id}</Card.Subtitle>
                                        <Card.Text>{order.order_date}</Card.Text>
                                    </Col>
                                    <Col align="center">
                                    <br/><br/>
                                        <Link to={{ pathname: "/orders/details", state: {order_details: order, prevPath: "/orders/history"} }}>
                                            <Button variant="link">Order Details</Button>
                                        </Link>

                                    </Col>
                                    <Col align="center">
                                        <br />
                                        <b>Status</b><br />
                                        {order.order_status}
                                        <br />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        </Draggable>
                    );

                });
            }
        }
        else {
            message = <Alert variant="warning">You do not have any orders made in the past.</Alert>
        }
        return (
            <div>
                            <Navbar /><br />

                <Container className="justify-content">
                    <h3>Your past orders</h3>
                    {message}
                    {orderCards}
                    <center>
                        <Button href="/home">Home</Button>
                    </center>
                </Container>
            </div>
        )
    }
}
export default CustomerPastOrders;