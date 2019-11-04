import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Alert, Container, Table, Card } from "react-bootstrap";
import Navbar from './Navbar.js';
import axios from 'axios';
import URL from '../config'

class ConfirmOrder extends Component {
    constructor(props) {
        super(props);

        //this.getUserProfile();
        this.placeOrder = this.placeOrder.bind(this);
    }
    componentWillMount() {
        document.title = "Your Order";
        if (this.props.location.state) {
            this.setState({
                restaurant: localStorage.getItem("cart_res_name"),
                cart_items: this.props.location.state.cart_items,
                sub_total: this.props.location.state.subTotal,
                total: this.props.location.state.total
            });
        }
    };

    getUserProfile = () => {
        axios.defaults.headers.common['authorization']= localStorage.getItem('token') 
        axios.get(`${URL}/profile/userget/${localStorage.getItem("user_id")}`)
        .then(response => {
            if(response.data[0]){
                this.setState({
                    address: response.data[0].address,
                    phone_number: response.data[0].phone_number
                    
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    };

    placeOrder = (e) => {

        let data = {
            user_id: localStorage.getItem("user_id"),
            res_id: localStorage.getItem("cart_res_id"),
            order_status: 'ORDER_PLACED',
            sub_total: 0,
            discount: 0,
            delivery: 0,
            tax: 0,
            delivery: this.state.delivery,
            total: this.state.total,
            cart_items: this.state.cart_items
        }
        axios.defaults.headers.common['authorization']= localStorage.getItem('token') 
        axios.post(`${URL}/restaurant/placeorder`, data)
            .then(response => {
                if (response.data === "ORDER_PLACED") {
                    localStorage.removeItem("cart_items");
                    localStorage.removeItem("cart_res_id");
                    this.setState({
                        message: response.data
                    });
                }
            })
            .catch(error => {
                this.setState({
                    message: "ORDER_ERROR"
                });
            });
    };

    render() {
        let redirectVar = null,
            order = null,
            message = null;

        if (!localStorage.getItem("user_id") || localStorage.getItem("is_owner") === "1") {
            redirectVar = <Redirect to="/" />
        }
        if (this.state.message === "ORDER_PLACED") {
            redirectVar = <Redirect to="/orders" />
        }
        else if (this.state.message === "ORDER_ERROR") {
            message = <Alert variant="warning">There was some error processing your order!</Alert>
        }
        else if (!localStorage.getItem("cart_items") || localStorage.getItem("cart_items").length === 0) {
            redirectVar = <Redirect to="/cart" />
        }

        if (this.state) {
            order = (
                <div>
                    <Card bg="light" style={{width: "40rem", height: "30rem"}}>
                        <Card.Title>
                            <br />
                            <h3>{localStorage.getItem("cart_res_name")}</h3>
                        </Card.Title>
                        <Card.Body>
                            <Table style={{ width: "90%" }}>
                                <tbody>
                                    <tr>
                                        <td colSpan="4">Your purchase</td>
                                        <td align="center">$ {this.state.sub_total}</td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4"><b>Total</b></td>
                                        <td align="center"><b>$ {this.state.total}</b></td>
                                    </tr>
                                    <br/>
                                   
                                </tbody>
                            </Table>
                            <center>
                                <Button variant="success" onClick={this.placeOrder}>Confirm Order</Button>&nbsp; &nbsp;
                                <Button variant="secondary" href="/home">Cancel</Button>
                            </center>
                            <br />
                        </Card.Body>
                    </Card>
                    <br />
                    <Button variant="info" href="/cart">Back to Cart</Button>
                </div>
            );
        }

        return (
            <div>
                {redirectVar}
                <Navbar /> <br />
                <Container>
                    <h3 align="center">Confirm your Order </h3>
                    <center>
                        {message}
                        {order}
                        <br /><br />
                    </center>
                </Container>
            </div>
        )
    }
}
export default ConfirmOrder;