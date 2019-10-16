import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import restaurantPlaceholder from '../images/restaurant_placeholder.jpg'

class RestaurantCard extends Component {
  render() {
    var resData = this.props.restaurant;
    //let imageSrc = `${URL}/grubhub/images/restaurant/${this.props.restaurant.res_image}`;
    return (
      <Link to={{pathname: '/restaurant', state: resData}}>
      <Card bg="white" style={{ width: "20rem", margin: "3%" }}>
        <Card.Img
          variant="top"
          style={{ height: "17rem" }}
          src={restaurantPlaceholder}
          // src={imageSrc}

        />
        <Card.Body>
          <Card.Title>{this.props.restaurant.res_name}</Card.Title>
          <Card.Text>{this.props.restaurant.res_cuisine}</Card.Text>
        </Card.Body>
      </Card>
      </Link>
    );
  }
}

export default RestaurantCard;