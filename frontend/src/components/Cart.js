import React, { Component } from 'react';
import Navbar from './Navbar.js';
import { Redirect } from 'react-router';
import { Button, Alert, Container, Table, Form, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import URL from '../config';
//import deleteIcon from "../../images/delete.jpg";
// import axios from 'axios';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart_items: []
        };
        this.clearCart = this.clearCart.bind(this);
        this.removeItem = this.removeItem.bind(this);
        //this.getRestaurantDetails();
    }

    componentWillMount() {
        document.title = "Cart";
        let cartItems = [];
        if (localStorage.getItem("cart_items")) {
            cartItems.push(...JSON.parse(localStorage.getItem("cart_items")));
            console.log(cartItems);
            this.setState({
                cart_items: cartItems
            });
        }

    };

    onQuantityChange = (e) => {
        let item_id = e.target.name;
        let newQuantity = parseInt(e.target.value);
        let cart_items = this.state.cart_items;
        let index = cart_items.findIndex((cart_item => cart_item.item_id === item_id));
        cart_items[index].item_quantity = newQuantity;
        this.setState({
            cart_items: cart_items
        });
        localStorage.setItem("cart_items", JSON.stringify(cart_items));
    };

    removeItem = (e) => {
        let item_id = e.target.name;
        let cart_items = this.state.cart_items;
        let items = [];
        let index = cart_items.findIndex((cart_item => cart_item.item_id === item_id));
        cart_items.splice(index, 1);
        this.setState({
            cart_items: cart_items
        });
        localStorage.setItem("cart_items", JSON.stringify(cart_items));
    }

    calculateSubTotal = () => {
        let cart_items = this.state.cart_items;
        let subTotal = 0;
        for (var i = 0; i < cart_items.length; i++) {
            for (var j = 0; j < cart_items.length; j++) {
                if (cart_items[i].item_id === cart_items[j].item_id) {
                    subTotal += (cart_items[i].item_quantity * cart_items[j].item_price);
                }
            }
        }
        subTotal = subTotal.toFixed(2);

        return subTotal;
    };

    clearCart = () => {
        localStorage.removeItem("cart_items");
        this.setState({
            cart_items: []
        });
    };

    render() {
        let redirectVar = null,
            itemsRender = [],
            message = null,
            resName,
            resAddress,
            resZIP,
            restaurantDetails = null,
            discountAmount = null;

            resName = localStorage.getItem("cart_res_name");


        let discount = 0,
            delivery = 6,
            tax = 0;

        if (!localStorage.getItem("user_id") || localStorage.getItem("is_owner") === "1") {
            redirectVar = <Redirect to="/" />
        }

        if (this.state && this.state.cart_items.length === 0) {
            message =
                [<center><Alert variant="warning">Cart Empty, please add something</Alert><br />
                    <Button href="/home">Home</Button></center>
                ]
        }
        else {
            restaurantDetails = (
                <Card bg="info" style={{ width: "50rem", margin: "2%" }}>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><center><h3>{resName}</h3></center></ListGroupItem>
                    </ListGroup>
                </Card>
            );
            let cart_items = this.state.cart_items;
            var subTotal = this.calculateSubTotal(cart_items);
            if (subTotal < 100) {
                discount = 0;
            }
            else {
                delivery = 0;
                discountAmount = (<tr>
                    <td colSpan="4">Discounts ({discount}%)</td>
                    <td align="center">$ {(subTotal * discount / 100).toFixed(2)}</td>
                </tr>);
            }
            var total = subTotal;
            for (var i = 0; i < cart_items.length; i++) {
                let quantity = [1, 2, 3, 4, 5];
                let quantityOptions = quantity.map(number => {
                    if (number === cart_items[i].item_quantity) {
                        return <option selected>{number}</option>;
                    }
                    return <option>{number}</option>;
                });
                let item = (
                    <tr>
                        <td align="center">{cart_items[i].item_name}</td>
                        <td align="center">$ {cart_items[i].item_price}</td>
                        <td align="center">
                            <Form.Control as="select" style={{ width: "30%" }} name={cart_items[i].item_id} onChange={this.onQuantityChange}>
                                {quantityOptions}
                            </Form.Control>
                        </td>
                        <td align="center">
                            <Button variant="link" name={cart_items[i].item_id}>
                            </Button>
                        </td>
                        <td align="center">$ {cart_items[i].item_price * cart_items[i].item_quantity}</td>
                    </tr>
                );
                itemsRender.push(item);
            }
            var confirmDetails = { restaurant: this.state.restaurant, subTotal: subTotal, delivery: delivery, discount: discount, tax: tax, total: total, cart_items: this.state.cart_items };
            var cartTable = (
                <div>
                    <Table style={{ width: "90%" }}>
                        <thead align="center">
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                            <th>Total Price</th>
                        </thead>
                        <tbody>
                            {itemsRender}
                            <br /><br /><br /><br />
                            <tr>
                                
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                                <td colSpan="4"><b>Total</b></td>
                                <td align="center"><b>$ {total}</b></td>
                            </tr>
                        </tbody>
                    </Table>

                    <Button variant="warning" size="lg" onClick={this.clearCart} block>
                    Drop Cart
                    </Button>
                    <br/>
                    <Link to={{ pathname: "/order/confirm", state: confirmDetails }}>

                    <Button variant="success" size="lg" block>
                        Checkout
                    </Button>

                    </Link>
                </div>
            );
        }

        return (
            <div>
                {redirectVar}
                <Navbar /><br />

                <Container>

                    <Card bg="light" style={{ width: '55rem', margin: "8%" }}>
                        <Card.Body>
                            <Card.Title><h3 align="center">Your Cart</h3><br /></Card.Title>
                            <Card.Text>
                                {message}
                                {restaurantDetails}
                                {cartTable}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>

            </div>
        )
    }
}
export default Cart;