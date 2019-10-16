import React, { Component } from 'react';
import Navbar from './Navbar.js';
import axios from 'axios';
import { Redirect } from 'react-router';
import RestaurantCard from "./RestaurantCard";
import { Col, Row,FormControl, Button,InputGroup, DropdownButton, Dropdown, Alert,  } from 'react-bootstrap';
import URL from '../config'
class CustomerHome extends Component {
    constructor(props) {
        super(props);
        this.setState({
            search_input: "",
            noRecord: false
        });
        this.onCuisineSelect = this.onCuisineSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            noRecord: false
        });
    }

    onSearch = (e) => {
        e.preventDefault();
        var searchInput = this.state.search_input;
        axios.defaults.headers.common['authorization']= localStorage.getItem('token') 
        axios.get(`${URL}/restaurant/searchrestaurant/${searchInput}`)
            .then(response => {
                var cuisines = [];
                if (response.data) {
                    if (response.data[0].search_result === 'NO_RECORD') {
                        this.setState({
                            noRecord: true,
                        });
                    }
                    else {
                        for (var i = 0; i < response.data.length; i++) {
                            cuisines.push(response.data[i].res_cuisine)
                        }
                        this.setState({
                            displayRestaurants: response.data,
                            cuisineList: cuisines,
                            noRecord: false,
                            restaurantList: response.data,

                        });
                    }
                }
            })
            .catch(er => {
                if (er.response && er.response.data) {
                    console.log(er.response.data);
                }
            })
    }

    onCuisineSelect = (e) => {
        var restaurantListAfterCuisineSelect = this.state.restaurantList.filter(restaurant => restaurant.res_cuisine === e.target.text);
        this.setState({
            displayRestaurants: restaurantListAfterCuisineSelect
        });
    }


    render() {

    let redirectvar = null;
        let homeRender = null;
        if (!localStorage.getItem("token")) {
            redirectvar = <Redirect to="/" />
        }

        var errorMsg = null,
        cuisineSelectDropdown = null,
            restaurantCards = null;
        if (this.state && this.state.cuisineList) {
            cuisineSelectDropdown = this.state.cuisineList.map(cuisine => {
                return (
                    <Dropdown.Item href="#" onClick={this.onCuisineSelect}>{cuisine}</Dropdown.Item>
                )
            })
        }

        if (this.state && this.state.displayRestaurants) {
            restaurantCards = this.state.displayRestaurants.map(restaurant => {
                return (
                    <Col sm={3}>
                        <RestaurantCard restaurant={restaurant} />
                    </Col>
                );
            });
        }

        if (this.state && this.state.noRecord) {
            errorMsg = (
                <Alert style={{ width: '60%' }} variant="danger">
                    No results found, please try again with different inputs..!
                </Alert>
            );
        }
        else {
            errorMsg = null;
        }

        return (
            <div>
            <Navbar/>
                <center><br /><br />
                    <h3>Hungry? Search your food here</h3>
                    <br />
                    <form onSubmit={this.onSearch}>
                        <InputGroup style={{ width: '50%' }} size="lg">
                            <FormControl
                                placeholder="You name it, we've got it!"
                                name="search_input"
                                aria-label="Search Restaurants"

                                required = {true}
                                onChange={this.onChange}
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Search</Button>
                            </InputGroup.Append>
                           

                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title="Cuisine"
                                id="input-group-dropdown-2"
                            >
                                {cuisineSelectDropdown}
                            </DropdownButton>


                        </InputGroup>
                    </form>
                    <br />
                    <br />
                    <br/>
                    {errorMsg}
                    <Row>{restaurantCards}</Row>
                </center>
            </div>
        )
    }
}

export default CustomerHome;