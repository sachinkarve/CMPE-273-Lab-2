import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom'
import {  Container,Card, Form, Row, Col,Button, Alert } from "react-bootstrap";
import URL from '../config'
import MessageModal from './MessageModal'

class OwnerHome extends Component {
    constructor(props) {
        super(props);
        this.fetchPendingOrders();
        this.onOrderStatusChange = this.onOrderStatusChange.bind(this);
    }




    fetchPendingOrders = () => {
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.get(`${URL}/orders/pendingorders/restaurant/${localStorage.getItem("user_id")}`)
            .then(response => {
                if (response.data[0]) {
                    this.setState({
                        pending_orders: response.data
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

    


    onOrderStatusChange = (e) => {
        
        e.preventDefault();
        let order_id = e.target.name;
        console.log(`****---order_id----*****`);
        console.log(order_id);
        let orders = this.state.pending_orders;
        let index = orders.findIndex((order => order._id === order_id));
        console.log(`*****---index----*****`);
        console.log(index);
        let newStatus = e.target.value;

        orders[index].order_status = newStatus;



        let data = {
            order_status: newStatus,
            order_id: order_id
        };
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/orders/orderstatus`, data)
            .then(response => {
                if (response.data === "STATUS_UPDATED") {
                    this.setState({
                        pending_orders: orders,
                        message: response.data
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    render() {


        let redirectvar = null;
        let orders = [];
        let orderCards = null;
        let message = null;
        let statusDropdown;
        let statusOptions;
        let statuses = ["ORDER_PLACED", "DELIVERED", "ORDER_DECLINED"];

        if (!localStorage.getItem('token')) {
            redirectvar = <Redirect to="/" />
        }


        if (this.state && this.state.message === "NO_PENDING_ORDERS") {
            message = (
                <Alert variant="warning" style={{ width: "40%" }} >No orders Pending for your Restaurant</Alert>
            );
        }
        else if (this.state && this.state.message === "STATUS_UPDATED") {
            message = (
                <Alert style={{width:"20%"}} variant="success">Status Updated</Alert>
            );
        }
        let loc = Location.pathname;
       
        if (this.state && this.state.pending_orders) {
            orders = this.state.pending_orders;
            if (orders.length > 0) {
                orderCards = orders.map(order => {
                    statusOptions = statuses.map(status => {
                        if (status === order.order_status) {
                            return <option selected>{status}</option>;
                        }
                        return <option>{status}</option>;
                    });
                    statusDropdown = (
                        <Form.Control as="select" style={{ width: "90%" }} name={order._id} onChange={this.onOrderStatusChange}>
                            {statusOptions}
                        </Form.Control>
                    );
                    return (
                        <Card bg="light" style={{ width: "60rem", margin: "4%" }}>
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
                                    <br/><br/>
                                        <Link to={{ pathname: "/orders/details", state: {order_details: order, prevPath: "/home"} }}>
                                            <Button variant="link">Order Details</Button>
                                        </Link>
                                    </Col>
                                    <Col align="center">
                                        <br />
                                        <br />
                                        {statusDropdown}
                                        <br />
                                        <MessageModal order={order}/>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    );
                });
            }
        }
        return (
            <div><Navbar/>
                <Container className="justify-content">
                    <br/>
                    <h2>Awaiting Orders</h2>
                    <br/>
                    {message}
                    {orderCards}
                </Container>
            </div>
        )
    }
}
export default OwnerHome;