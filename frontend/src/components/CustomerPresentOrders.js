import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Navbar from './Navbar';
import axios from 'axios';
import { Card, Container, Col, Row, Modal, Button, Alert } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";
import URL from '../config'
import MessageModal from './MessageModal'

class CustomerPresentOrders extends Component {
    constructor(props) {
        super(props);
        this.setState({
            pending_orders: [],
        });

        this.cancelOrder = this.cancelOrder.bind(this);
        this.getPendingOrders();
    }

    componentWillMount() {
        document.title = "Your Orders";
    }


    cancelOrder = (e) => {
        let pending_orders = this.state.pending_orders;
        let data = {
            order_id: e.target.name
        };
        console.log(`****----data----****`);
        console.log(data);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.post(`${URL}/orders/cancelorder`, data)
            .then(response => {
                if (response.data === "ORDER_CANCELLED") {
                    let index = pending_orders.findIndex(order => order._id === data.order_id);
                    pending_orders.splice(index, 1);
                    this.setState({
                        pending_orders: pending_orders,
                        message: response.data
                    });
                    this.getPendingOrders();

                }
            })
            .catch(error => {
                this.setState({
                    message: "ORDER_ERROR"
                });
            });
    };



    getPendingOrders = () => {
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')

        axios.get(`${URL}/orders/pendingorders/${localStorage.getItem("user_id")}`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        pending_orders: response.data
                    });
                    console.log(`****----response.data--*******`);
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
        let redirectVar = null;
        let orders = [];
        let orderCards = null;
        let message = null;


        if (!localStorage.getItem("user_id") || localStorage.getItem("is_owner") === "1") {
            redirectVar = <Redirect to="/" />
        }
        if (this.state && this.state.message === "ORDER_CANCELLED") {
            message = <Alert variant="success">Your order is cancelled.</Alert>
        }
        else if (this.state && this.state.message === "ORDER_ERROR") {
            message = <Alert variant="warning">Your order could not be cancelled.</Alert>
        }
        else if (this.state && this.state.message === "NO_PENDING_ORDERS") {
            message = (
                <Link to="/orders/history">
                    <Alert variant="warning">You do not have any pending orders. Click here to view your past orders.</Alert>
                </Link>
            );
        }
        if (this.state && this.state.pending_orders) {
            orders = this.state.pending_orders;
            if (orders.length > 0) {
                orderCards = orders.map(order => {
                    return (
                        <Card bg="light" style={{ width: "60rem", height: "8rem", margin: "2%" }}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Title>{order.restaurant.res_name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{order.total}</Card.Subtitle>
                                        <Card.Text>{order._id}</Card.Text>

                                        <Row>

                                        </Row>
                                    </Col>
                                    <Col align="center">
                                        <Card.Text>{order.order_status}</Card.Text>
                                        <Card.Text>{order.order_date}</Card.Text>
                                    </Col>
                                    <Col align="center">
                                        <Button variant="secondary" name={order._id} onClick={this.cancelOrder}>Cancel Order</Button>&nbsp;
                                        <br />
                                        <br />
                                        <MessageModal order={order} />
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    );
                });
            }
        }
        return (
            <div>
                {redirectVar}
                <Navbar /><br />
                <Container className="justify-content">
                    <h3>Your Pending Orders</h3><br />
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

export default CustomerPresentOrders;