import React, { Component } from "react";
import { Link } from "react-router-dom";
import grubhubLogo from "../images/grubhub-icon.jpeg";
import { Navbar, Dropdown, ButtonGroup, Button, Nav } from 'react-bootstrap';

//create the Navbar Component
class Navigationbar extends Component {
  constructor() {
    super();
    console.log(`constructor called`)
    this.state = {
      howdyName: ""
    }
    console.log(this.howdyName);
    console.log(`constructor end`);
  }

  componentDidMount() {
    console.log(`inside will mount`);
    this.setState({
      howdyName: localStorage.getItem("name")
    })
    console.log(`local set in component did mouont`);
  }

  handleLogout = () => {
    if (localStorage.getItem("token")) {
      window.localStorage.clear();
      window.location = "/login"; //TODO: this might create problem in howdy

    } 
  };

  render() {
    let navLogo = null;
    let navMenu = null;
    let navUser = null;
    let navLogin = null;
    let navOrders = null;
    let loginLink = null;
    let howdyCustomer = null;
    let howdyOwner = null;
    let navCart = null;

    if (localStorage.getItem('token')) {
      loginLink = <Link to="/" className="nav-link" onClick={this.handleLogout}>Logout</Link>;
    }
    else {
      loginLink = <Link to="/login" className="nav-link" onClick={this.handleLogout}>Login</Link>;
    }

    navLogo = (
      <Link to='/home' className="nav-link">
        <img src={grubhubLogo} width="60" height="auto" className="d-inline-block align-top" alt="Grubhub" />
      </Link>
    );

    navLogin = (
      <ul class="nav navbar-nav navbar-right">
        <li className="nav-item">
          {loginLink}
        </li>
      </ul>
    );

    howdyCustomer = (
      <Dropdown as={ButtonGroup}>
        <Button variant="primary">Howdy! {this.state.howdyName}</Button>
        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item><Link to="/profile" className="nav-link">Profile</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/CustomerPastOrders" className="nav-link">Past Orders</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/CustomerPresentOrders" className="nav-link">Current orders</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );


    howdyOwner = (

      <Dropdown as={ButtonGroup}>
        <Button variant="primary">Howdy! {this.state.howdyName}</Button>
        <Dropdown.Toggle variant="primary" id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item><Link to="/profile" className="nav-link">Profile</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/PastOrders" className="nav-link">Past orders</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    
    navOrders = (
      <Link to="/orders" className="nav-link">
        Orders
          </Link>
    );


    navMenu = (
      <Link to="/updatemenu" className="nav-link">
        Menu
          </Link>
    );

    navCart = (
      <Link to="/cart" className="nav-link">
        Cart
          </Link>
    );



    if (localStorage.getItem('token')) {
      console.log(`inside navuser now checking for kind of user World@@`);
      if (localStorage.getItem("is_owner") === "true") {

        navUser = (
          <div className="collapse navbar-collapse navbar-right" id="navbarNav">
            <Nav className="mr-auto">
              <Nav.Link>{navMenu}</Nav.Link>
            </Nav>
            <Nav.Link>{howdyOwner}</Nav.Link>
            {/* <Nav.Link>{navProfile}</Nav.Link> */}
            <Nav.Link>{navLogin}</Nav.Link>
          </div>
        );
      }
      else {
        navUser = (
          <div className="collapse navbar-collapse navbar-right" id="navbarNav">
            <Nav className="mr-auto">
              <Nav.Link>{navCart}</Nav.Link>
            </Nav>
            <Nav.Link>{howdyCustomer}</Nav.Link>
            {/* <Nav.Link>{navProfile}</Nav.Link> */}
            <Nav.Link>{navLogin}</Nav.Link>
          </div>
        );
      }
    }
    else {
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto">
          </Nav>
          <Nav.Link>{navLogin}</Nav.Link>
        </div>
      );
    }

    return (
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand>{navLogo}</Navbar.Brand>
          {navUser}
        </Navbar>
      </div>
    );
  }
}

export default Navigationbar;