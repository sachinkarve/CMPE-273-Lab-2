import React, { Component } from 'react';
import Navbar from './Navbar.js';
import axios from 'axios';
import { Redirect } from 'react-router';
import RestaurantCard from "./RestaurantCard";
import { Col, Row, FormControl, Button, InputGroup, DropdownButton, Dropdown, Alert, Pagination } from 'react-bootstrap';
import URL from '../config'


import propTypes from 'prop-types'
import { connect } from 'react-redux';
import { restaurantSearchAction } from '../actions/ordersAction'


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


    componentWillReceiveProps(incomingProps) {
        console.log(`****-----props came in with items----****`);
        console.log(incomingProps.RESTAURANT);
        var cuisines = [];
        if (incomingProps.RESTAURANT) {
            if (incomingProps.RESTAURANT[0].search_result === 'NO_RECORD') {
                this.setState({
                    noRecord: true,
                });
            }
            else {
                for (var i = 0; i < incomingProps.RESTAURANT.length; i++) {
                    cuisines.push(incomingProps.RESTAURANT[i].res_cuisine)
                }
                this.setState({
                    displayRestaurants: incomingProps.RESTAURANT,
                    cuisineList: cuisines,
                    noRecord: false,
                    restaurantList: incomingProps.RESTAURANT,

                });
            }
        }
    }


        onChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value,
                noRecord: false
            });
        }

        onSearch = (e) => {
            e.preventDefault();
            console.log(`CALLING_SEARCH`);
            var searchInput = this.state.search_input;

            this.props.restaurantSearchAction(searchInput);

            // axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
            // axios.get(`${URL}/restaurant/searchrestaurant/${searchInput}`)
            //     .then(response => {
            //         var cuisines = [];
            //         if (response.data) {
            //             if (response.data[0].search_result === 'NO_RECORD') {
            //                 this.setState({
            //                     noRecord: true,
            //                 });
            //             }
            //             else {
            //                 for (var i = 0; i < response.data.length; i++) {
            //                     cuisines.push(response.data[i].res_cuisine)
            //                 }
            //                 this.setState({
            //                     displayRestaurants: response.data,
            //                     cuisineList: cuisines,
            //                     noRecord: false,
            //                     restaurantList: response.data,

            //                 });
            //             }
            //         }
            //     })
            //     .catch(er => {
            //         if (er.response && er.response.data) {
            //             console.log(er.response.data);
            //         }
            //     })
        }

        onCuisineSelect = (e) => {
            var restaurantListAfterCuisineSelect = this.state.restaurantList.filter(restaurant => restaurant.res_cuisine === e.target.text);
            this.setState({
                displayRestaurants: restaurantListAfterCuisineSelect
            });
        }

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

            let redirectvar = null;
            let homeRender = null;
            if (!localStorage.getItem("token")) {
                redirectvar = <Redirect to="/" />
            }

            var cuisineDropdown = null,
                restaurantCards = [],
                resCard = null,
                pagesBar = null,
                active = 1,
                itemsToShow = 2,
                noRecordMessage = null;
            if (this.state && this.state.cuisineList) {
                cuisineDropdown = this.state.cuisineList.map(cuisine => {
                    return (
                        <Dropdown.Item href="#" onClick={this.onCuisineSelect}>{cuisine}</Dropdown.Item>
                    )
                })
            }

            if (this.state && this.state.activePage) {
                active = this.state.activePage;
            }

            if (this.state && this.state.displayRestaurants) {
                let restaurants = this.state.displayRestaurants;
                let cardCount = 0;
                for (let i = (active - 1) * itemsToShow; i < restaurants.length; i++) {
                    resCard = (
                        <Col sm={3}>
                            <RestaurantCard restaurant={restaurants[i]} />
                        </Col>
                    );
                    restaurantCards.push(resCard);
                    cardCount++;
                    if (cardCount === itemsToShow)
                        break;
                }

                let pages = [];
                let pageCount = Math.ceil(restaurants.length / itemsToShow);

                for (let i = 1; i <= pageCount; i++) {
                    pages.push(
                        <Pagination.Item key={i} active={i === active} name={i} onClick={this.changePage}>
                            {i}
                        </Pagination.Item>
                    );
                }
                pagesBar = (
                    <div>
                        <br />
                        <Pagination>
                            <Pagination.Prev name="1" onClick={this.changePage} />
                            {pages}
                            <Pagination.Next name={pageCount} onClick={this.changePage} />
                        </Pagination>
                    </div>
                );
            }

            if (this.state && this.state.noRecord && this.state.search_input === "") {
                noRecordMessage = (
                    <Alert variant="warning">
                        No Restaurants are available now. Please try again later.
                </Alert>
                );
            }
            else if (this.state && this.state.noRecord) {
                noRecordMessage = (
                    <Alert variant="warning">
                        No Results. Please try again.
                </Alert>
                );
            }
            else {
                noRecordMessage = null;
            }

            return (
                <div>
                    <center>
                        <Navbar />
                        <center><br /><br />
                        </center>                 <h3>Hungry? Search your food here</h3>
                        <br />
                        <form onSubmit={this.onSearch}>
                            <InputGroup style={{ width: '50%' }} size="lg">
                                <FormControl
                                    placeholder="You name it, we've got it!"
                                    aria-label="Search Restaurants"
                                    aria-describedby="basic-addon2"
                                    name="search_input"
                                    onChange={this.onChange}
                                />
                                <InputGroup.Append>
                                    <Button variant="primary" type="submit">Search</Button>
                                </InputGroup.Append>
                                <DropdownButton
                                    as={InputGroup.Append}
                                    variant="info"
                                    title="Cuisine"
                                    id="input-group-dropdown-2"
                                >
                                    {cuisineDropdown}
                                </DropdownButton>
                            </InputGroup>
                        </form>
                        <br /><br />
                        {noRecordMessage}
                        <Row>{restaurantCards}</Row>
                    </center>
                    <Row>
                        <Col sm={5}></Col>
                        <Col>{pagesBar}</Col>
                    </Row>
                </div>
            )
        }
    }


    CustomerHome.propTypes = {
        restaurantSearchAction: propTypes.func.isRequired,
        RESTAURANT: propTypes.object.isRequired
    }

    const mapStateToProps = state => ({
        RESTAURANT: state.ordersReducer.orderState
    })

    export default connect(mapStateToProps, { restaurantSearchAction })(CustomerHome)