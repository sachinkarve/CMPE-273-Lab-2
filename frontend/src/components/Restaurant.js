import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import ItemCard from "./ItemCard"
import { Button, Card, Container, Col, Row, Pagination } from 'react-bootstrap';
import Navbar from './Navbar.js';
import resImageSrc_placeholder from '../images/restaurant_placeholder.jpg'
import URL from '../config'

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.setState({
            menu_sections: [],
            activePage: 1
        });
        this.sectionItems = this.sectionItems.bind(this);
        this.changePage = this.changePage.bind(this);
        this.getSections();
    }

    componentWillMount() {
        if (this.props.location.state) {
            document.title = this.props.location.state.res_name;
        }
    }

    getSections = () => {
        if (this.props.location.state) {
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            console.log(`*****-----this.props.location.state.user_ref----*****`);
            console.log(this.props);
            console.log(this.props.location.state._id);
            axios.get(`${URL}/menu/sections/${this.props.location.state.user_ref}`)
                .then(response => {
                    if (response.data) {
                        console.log(`****----Below is the response.data----*****`);
                        console.log(response.data);
                        this.setState({
                            menu_sections: response.data
                        });
                    }
                })
                .catch(err => {
                    if (err) {
                        console.log(err);
                    }
                });
        }
    };

    sectionItems = (menu_section) => {
        var itemsRender = [], items, item, section;

        items = menu_section.menu_item;
        if (items.length > 0) {
            section = <h4>{menu_section.menu_section_name}</h4>;
            itemsRender.push(section);
            for (var i = 0; i < items.length; i++) {
                item = <ItemCard menu_item={items[i]} res_id={this.props.location.state._id} res_name={this.props.location.state.res_name}/>;
                itemsRender.push(item);
            }
        }
        return itemsRender;
    };

    changePage = (e) => {
        let page = this.state.activePage;
        if (e.target.text === ">" && page !== parseInt(e.target.name)) {
            page += 1;
        } else if (e.target.text === "<" && page !== parseInt(e.target.name)) {
            page -= 1;
        } else {
            page = parseInt(e.target.name);
        }
        this.setState({
            activePage: page
        });
    };

    render() {
        let redirectVar = null,
            section = null,
            renderOutput = [],
            resImageSrc = null,
            active = 1,
            itemsToShow = 1,
            pagesBar = null,
            resName, resPhone, resAddress, resCuisine, resZIP,
            restaurant = this.props.location.state;

        if (!localStorage.getItem("user_id") || !this.props.location.state) {
            redirectVar = <Redirect to="/home" />
        }

        if (this.state && this.state.activePage) {
            active = this.state.activePage;
        }

        if (restaurant) {
            resImageSrc = resImageSrc_placeholder;
            resName = restaurant.res_name;
            resZIP = restaurant.res_zip_code;
            resAddress = restaurant.res_address;
            resPhone = restaurant.res_phone_number;
            resCuisine = restaurant.res_cuisine;
        }
        if (this.state && this.state.menu_sections && this.state.menu_sections.length > 0) {
            let menu_sections = this.state.menu_sections.filter(menu_section => menu_section.menu_item.length);
            let sectionCount = 0;
            for (var i = (active - 1) * itemsToShow; i < menu_sections.length; i++) {
                section = this.sectionItems(this.state.menu_sections[i]);
                renderOutput.push(section);
                if (++sectionCount === itemsToShow)
                    break;
            }

            let pages = [];
            let pageCount = Math.ceil(menu_sections.length / itemsToShow);

            for (let i = 1; i <= pageCount; i++) {
                pages.push(
                    <Pagination.Item active={i === active} name={i} key={i} onClick={this.changePage}>
                        {i}
                    </Pagination.Item>
                );
            }
            pagesBar = (
                <div>
                    <Pagination>
                        <Pagination.Prev name="1" onClick={this.changePage} />
                        {pages}
                        <Pagination.Next name={pageCount} onClick={this.changePage} />
                    </Pagination>
                </div>
            );
        }
        return (
            <div>
                {redirectVar}
                <Navbar />

                <Card bg="light" text="dark" style={{ width: "90rem", height: "15rem", margin: "2%" }}>
                    <Row>
                        <Col>
                            <Card.Img style={{ width: "18rem", height: "15rem" }} src={resImageSrc} />
                        </Col>
                        <Card.Body>
                            <Card.Title><h1>{resName}</h1></Card.Title>
                            <br />
                            <Card.Text><h4> {resZIP}</h4></Card.Text>
                            <br />
                            <Card.Text><h4>Cuisine: {resCuisine}</h4></Card.Text>
                        </Card.Body>
                    </Row>
                </Card>
                <Container>
                    {renderOutput}
                </Container>
                <Row>
                    <Col sm={5}></Col>
                    <Col>{pagesBar}</Col>
                </Row>
                <center>
                    <Button href="/home">Home</Button>&nbsp;&nbsp;
                    <Button variant="success" name="goToCart" href="/cart">Go To Cart</Button>
                </center>
                <br />
            </div>
        )
    }
}

export default Restaurant;