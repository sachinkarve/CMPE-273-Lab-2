import React, { Component } from 'react';
import axios from 'axios';
import { Card, Container, Col, Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import URL from '../config'
import Navbar from './Navbar';

class OwnerOrderHistory extends Component {
    constructor(props) {
        super(props);
        this.getCompletedOrders();
    }

    getCompletedOrders = () => {
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        console.log(`hiiiiiii`);
        axios.get(`${URL}/orders/completedorders/restaurant/${localStorage.getItem("user_id")}`)
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
                        <Card bg="light" style={{ width: "60rem", margin: "3%" }}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Title>{order.customer.customer_name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{order._id}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">{order.phone_number}</Card.Subtitle>
                                        <br />
                                        <Card.Text>{order.order_date}</Card.Text>
                                    </Col>
                                    <Col align="center">
                                    <br/>
                                        <Link to={{ pathname: "/orders/details", state: {order_details: order, prevPath: "/orders/history"} }}>
                                            <Button variant="link">Order Details</Button>
                                        </Link>
                                        <br />
                                        {order.order_status}
                                        <br />
                                    </Col>
                                    
                                </Row>
                            </Card.Body>
                        </Card>
                    );

                });
            }
        }
        else {
            message = <Alert variant="warning">No Orders fulfilled</Alert>
        }
        return (
            <div>                <Navbar /><br />

                <Container className="justify-content">
                    <h3>Restaurant past orders</h3>
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
export default OwnerOrderHistory;