//import URL from '../config'

import React, { Component } from "react";
import { Card,Button, Col, Row } from "react-bootstrap";
import imageSrc from '../images/item_placeholder.jpg'
class ItemCard extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
    console.log(this.props);
  }

  addToCart = (e) => {
    let item_id = this.props.menu_item._id;
    let cartItems = [];
    //let cartItemIds = [];

    if (localStorage.getItem("cart_res_id") !== this.props.res_id) {
      localStorage.setItem("cart_items", cartItems);
    }

    if (localStorage.getItem("cart_items")) {
      cartItems.push(...JSON.parse(localStorage.getItem("cart_items")));
    }

    let index = cartItems.findIndex((cartItem => cartItem.item_id === item_id));
    if (index === -1) {
      e.target.textContent = "Remove from Cart";
      e.target.className = "btn btn-warning";
      cartItems.push({ item_id: item_id, item_quantity: 1, item_price: this.props.menu_item.itemPrice, item_name: this.props.menu_item.itemName });
      localStorage.setItem("cart_res_id", this.props.res_id);
      localStorage.setItem("cart_res_name", this.props.res_name);
      console.log(`*****-----this.props-----*****`);
      console.log(this.props);

      localStorage.setItem("cart_items", JSON.stringify(cartItems));
    }
    else {
      e.target.textContent = "Add to Cart";
      e.target.className = "btn btn-primary";
      cartItems.splice(index, 1);
      localStorage.setItem("cart_items", JSON.stringify(cartItems));
    }
  };


  render() {
    // let imageSrc = `${URL}/images/item/${this.props.menu_item.item_image}`;

    let buttonText = "Add to Cart";
    let buttonVariant = "primary";
    let cartItems = [];
    let cartItemIds = [];
    if (localStorage.getItem("cart_items")) {
      cartItems.push(...JSON.parse(localStorage.getItem("cart_items")));
      cartItemIds = cartItems.map(cartItem => cartItem._id);
      buttonText = cartItemIds.includes(this.props.menu_item._id) ? "Drop from Cart" : buttonText;
      buttonVariant = cartItemIds.includes(this.props.menu_item._id) ? "danger" : buttonVariant;
    }

    return (
      <Card bg="white" style={{ width: "50rem", height: "8rem", margin: "2%" }}>
        <Row>
          <Col>
            <Card.Img style={{ width: "12rem", height: "8rem" }} src={imageSrc} />
          </Col>
          <Card.Body>
            <Card.Title>{this.props.menu_item.itemName}</Card.Title>
            <Card.Text>{this.props.menu_item.itemDescription}</Card.Text>
            <Card.Text>Price: $ {this.props.menu_item.itemPrice}</Card.Text>
          </Card.Body>
          <Col align="right">
            <br /><br />
            <Button variant={buttonVariant} onClick={this.addToCart} name={this.props.menu_item._id}>{buttonText}</Button>&nbsp; &nbsp;
            </Col>
        </Row>
      </Card>
    );
  }
}

export default ItemCard;