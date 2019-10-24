import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import Navbar from './Navbar.js'
import { Row, Card, Container, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import item_placeholder from '../images/item_placeholder.jpg'
import URL from '../config'


class Viewitemandsections extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allSections: [],
            user_id: localStorage.getItem("user_id"),
            sectionsError: false,

            allItems: [],
            itemError: false,
        }
        this.fetchSections();
        // this.getItems();

    }


    itemFetcher(menu_section) {
        let existingItem = [];
        let secItems = [];
        console.log(`***---inside itemFetcher----****`);
        console.log(`***--- Menu_section----****`);
        console.log(menu_section);
        let sectionVar = (<Card style={{ height: '5rem', width: '25rem' }}>
            <Card.Body>
                <Card.Text>
                   <h2> {menu_section.menu_section_name }</h2>
                </Card.Text>
            </Card.Body>
        </Card>)

        existingItem.push(sectionVar);
        secItems = this.state.allItems.filter(item => item.sec_ref === menu_section._id);
        secItems = secItems.map(item =>
            (
                <Card style={{ height: '18rem', width: '20rem' }}>
                    <Card.Img variant="top" style={{ height: '10rem', width: '20rem' }} src={item_placeholder} />
                    <Card.Body>
                        <Card.Text>
                            <h8>{item.itemName}</h8><br />
                            <h8>{item.itemPrice}</h8><br />
                            <h8>{item.itemDescription}</h8><br />
                        </Card.Text>
                    </Card.Body>
                </Card>

            )
        )

        existingItem.push(...secItems);
        return existingItem;
    }

    SectionAndItemDisplayer = () => {

        let section;
        let itemArray = [];
        console.log(`SectionAndItemDisplayer`);
        console.log(this.state.allSections);
        for (let i = 0; i < this.state.allSections.length; i++) {
            section = this.state.allSections[i].menu_section_name;
            itemArray.push(this.itemFetcher(this.state.allSections[i]));
        }
        console.log(itemArray);
        return itemArray;
    }


    fetchSections = () => {
        axios
            .get(`${URL}/section/${localStorage.getItem("user_id")}`)
            .then(response => {
                if (response.status === 200) {
                    console.log(`******-----response.data------**********`);

                    console.log(response.data);
                    this.setState({
                        allSections: response.data
                    });

                    var fetched_items = [];
                    response.data.map(section => {
                        fetched_items.push(...section.menu_item);
                    })
                    this.setState({
                        allItems: fetched_items
                    });
                    console.log(`******-----fetchedItems saved------**********`);
                    console.log(fetched_items);
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            });
    };



    // getItems = () => {
    //     // console.log(`inside getItems`);
    //     // axios.defaults.withCredentials = true;
    //     // axios.defaults.headers.common['authorization']= localStorage.getItem('token')
    //     // axios.get(`${URL}/item/getallitems/${this.state.user_id}`)
    //     //     .then(response => {
    //     //         this.setState({
    //     //             allItems: response.data
    //     //         })
    //     //         console.log(`below is allItems from state`);
    //     //         console.log(this.state.allItems);
    //     //     })
    //     //     .catch(err => {
    //     //         console.log(`error occured:: ${err}`);
    //     //         this.setState({
    //     //             itemError: true
    //     //         })
    //     //     });
    //     // console.log(`finished getItems`);

    // }



    render() {
        let redirectvar = null;
        let output = [];
        if (!localStorage.getItem('token')) {
            redirectvar = <Redirect to="/login" />
        }

        if (this.state.allItems.length > 0 && this.state.allSections.length > 0) {
            output = this.SectionAndItemDisplayer();
            console.log(output);
        }

        return (
            <div>
                {redirectvar}
                <Navbar />

                <Container fluid={true}>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                            <h1>Menu</h1>

                            {output}
                        </Col>
                        <Col></Col>
                    </Row>
                    <Link to="/updatemenu"><Button variant="link">Update Menu</Button></Link>

                </Container>
            </div>
        )
    }
}
export default Viewitemandsections
