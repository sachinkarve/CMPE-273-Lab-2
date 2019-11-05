import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import Navbar from './Navbar.js'
import item_placeholder from '../images/item_placeholder.jpg'
import { Row, Card, Alert, ListGroup, Dropdown, Container, Button, Col } from 'react-bootstrap';
import URL from '../config'
import propTypes from 'prop-types'
import { connect } from 'react-redux';
import { addItemAction, deleteItemAction, updateItemAction } from '../actions/itemAction'



class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addItemName: null,
            addItemDescription: null,
            addItemPrice: null,
            addItemSection: null,
            user_id: localStorage.getItem("user_id"),
            deleteItemName: "",

            addResponseMsg: "",
            deleteResponseMsg: "",
            updateSearchMsg: null,
            updateStatus: null,

            editComponentFlag: null,
            updateItemName: "",
            item_id: "",

            item_response_item_name: "",
            item_response_item_description: "",
            item_response_item_price: "",

            newItemName: "",
            newItemDescription: "",
            newItemPrice: "",

            fetched_menu_sections: [],
            fetched_items: [],
            menu_section_name: "",
            menu_section_id: "",
            sec_id: "",
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.updateFieldHandler = this.updateFieldHandler.bind(this);
        this.onAddSubmit = this.onAddSubmit.bind(this);
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        // this.onUpdateHandler = this.onUpdateHandler.bind(this);
        this.fetchSections = this.fetchSections.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    componentWillMount() {
        this.fetchSections();

    }

    componentWillReceiveProps(incomingProps) {
        console.log(`****-----props came in with items----****`);
        console.log(incomingProps.ITEM);

        if (incomingProps.ITEM === 'ITEM_ADDED' || incomingProps.ITEM ==='ITEM_ADDITION_FAILED' || incomingProps.ITEM=== 'ITEM_EXISTS') {
            console.log(`inside if #############`);
            this.setState({ addResponseMsg: incomingProps.ITEM })
        }
        else if (incomingProps.ITEM === 'UPDATE_SUCCESSFULL' || incomingProps.ITEM === 'ITEM_EXISTS_CANNOT_UPDATE' ) {
            console.log(`inside else if #############`);
            this.setState({ updateStatus: incomingProps.ITEM })
        } 
        else if (incomingProps.ITEM === 'DELETION_FAILED' || incomingProps.ITEM === 'ITEM_DELETED_SUCCESSFULLY' ) {
            console.log(`inside else if of delete#############`);
            this.setState({ deleteResponseMsg: incomingProps.ITEM })
        }
        else {
            console.log(`****-----SOME PROPS NOT MATCHING ANYTHING-----*****`);
            console.log(incomingProps);
        }
        this.fetchSections();

    }

    fetchSections = () => {
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')

        axios
            .get(`${URL}/section/${localStorage.getItem("user_id")}`)
            .then(response => {
                if (response.status === 200) {
                    console.log(`******-----response.data------**********`);

                    console.log(response.data);
                    this.setState({
                        fetched_menu_sections: response.data
                    });

                    var fetched_items = [];
                    response.data.map(section => {
                        fetched_items.push(...section.menu_item);
                    })
                    this.setState({
                        fetched_items: fetched_items
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



    handleSelection = e => {
        e.preventDefault();
        let section_name = e.target.name;
        let section_details = this.state.fetched_menu_sections.filter(
            section => section.menu_section_name === section_name
        );
        console.log({ section_details });
        this.setState({
            menu_section_name: section_details[0].menu_section_name,
            menu_section_id: section_details[0]._id
        });
    };

    handleItemSelection = e => {
        console.log(`***---e.target----***`);
        console.log(e.target.name);
        e.preventDefault();
        let item_id = e.target.name;
        let item_details = this.state.fetched_items.filter(
            item => item._id === item_id
        );
        console.log({ item_details });
        this.setState({
            updateStatus: "",
            item_response_item_name: item_details[0].itemName,
            item_response_item_description: item_details[0].itemDescription,
            item_response_item_price: item_details[0].itemPrice,
            item_id: item_details[0]._id,
            sec_id: item_details[0].sec_ref
        });
    };

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            addResponseMsg: "",
            deleteResponseMsg: "",
            updateSearchMsg: null,
            updateStatus: null,
        })
    }

    updateFieldHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            editComponentFlag: null,
            updateStatus: null,
            newItemName: "",
            newItemDescription: "",
            newItemPrice: "",
            updateSearchMsg: null
        });
    }


    onSubmitUpdate = (e) => {

        e.preventDefault();
        const data = {
            item_id: this.state.item_id,
            newItemName: this.state.item_response_item_name,
            newItemDescription: this.state.item_response_item_description,
            newItemPrice: this.state.item_response_item_price,
            sec_id: this.state.sec_id,
            user_id: localStorage.getItem('user_id')
        }
        console.log(`*******---data----*******`);
        console.log(data);
        this.props.updateItemAction(data)

    }


    
    onAddSubmit = (e) => {
        //prevent page from refresh
        console.log(`inside add Items ka submit`)
        e.preventDefault();
        const data = {
            itemName: this.state.addItemName,
            itemDescription: this.state.addItemDescription,
            itemPrice: this.state.addItemPrice,
            menu_section_name: this.state.menu_section_name,
            menu_section_id: this.state.menu_section_id,
            user_id: this.state.user_id
        }
        this.props.addItemAction(data)
    }


    onDeleteSubmit = (e) => {
        //prevent page from refresh
        console.log(`inside delete Item ka submit`)
        e.preventDefault();
        let str = e.target.name.split(',');
        let sec_id = str[0]
        let item_id = str[1];
        const data = {
            sec_id: sec_id,
            item_id: item_id,
            user_id: localStorage.getItem("user_id")
        }
        console.log(`data obj below`);
        console.log(data);
        // axios.defaults.withCredentials = true;
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        // axios.post(`${URL}/item/deleteitem`, data)
        //     .then(response => {
        //         this.setState({
        //             deleteResponseMsg: response.data
        //         })
        //         this.fetchSections();

        //     }).catch(err => {
        //         this.setState({
        //             deleteResponseMsg: err.status
        //         })
        //     });

        this.props.deleteItemAction(data)
    }


    render() {
        let popupMsg = null;
        let ItemUpdateComponent = '';
        let updateStatusPopupMsg = null;
        let updatePopupMsg = null;
        let redirectvar = null;
        let deletePopupMsg = null;
        let redirectVar = '';

        switch (this.state.addResponseMsg) {
            case "ITEM_ADDED":
                popupMsg = (<Alert variant="success">Item Added Successfully!!</Alert>)
                break;
            case "ITEM_EXISTS":
                popupMsg = (<Alert variant="warning">Item Exists!!</Alert>)
                break;
            case "SECTION_DOES_NOT_EXIST":
                popupMsg = (<Alert variant="warning">Section Doesn't Exists!!</Alert>)
                break;
            case "ITEM_ADDITION_FAILED":
                popupMsg = (<Alert variant="danger">Addition Failed!!</Alert>)
                break;
            default:
                popupMsg = null;
        }

        switch (this.state.deleteResponseMsg) {
            case "ITEM_DELETED_SUCCESSFULLY":
                deletePopupMsg = (<Alert variant="success">Item Deleted Successfully!!</Alert>)
                break;
            case "DELETION_FAILED":
                deletePopupMsg = (<Alert variant="danger">Deletion failed!!</Alert>)
                break;
            case "SOMETHING_WENT_WRONG":
                deletePopupMsg = (<Alert variant="warning">Something went wrong!!</Alert>)
                break;
            default:
                deletePopupMsg = null;
        }

        switch (this.state.updateStatus) {
            case "UPDATE_SUCCESSFULL":
                updateStatusPopupMsg = (<Alert variant="success">Item Updated Successfully!!</Alert>)
                break;
            case "SOMETHING_WENT_WRONG":
                updateStatusPopupMsg = (<Alert variant="danger">Update failed!!</Alert>)
                break;
            case "ITEM_EXISTS_CANNOT_UPDATE":
                updateStatusPopupMsg = (<Alert variant="danger">Item Exists!!</Alert>)
                break;
            default:
                updateStatusPopupMsg = null;
        }

        switch (this.state.updateSearchMsg) {
            case "SUCCESS":
                updatePopupMsg = (<Alert variant="success">Item Ready for editing..</Alert>)
                break;
            case "NO_ROW_RETURNED":
                updatePopupMsg = (<Alert variant="warning">Item doesn't Exist!!</Alert>)
                break;
            default:
                updatePopupMsg = null;
        }


        if (!localStorage.getItem('token')) {
            redirectvar = <Redirect to="/login" />
        }


        let DisplayItemsForDelete = [];
        DisplayItemsForDelete = this.state.fetched_items.map(item => {
            return (
                <div>
                    <Card style={{ width: '18rem' }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <label for="displayItems" >{item.itemName}</label>
                                <Button variant="link" name={item.sec_ref + ',' + item._id} onClick={this.onDeleteSubmit}>Delete</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            )
        })

        let section_options = null;
        if (
            this.state &&
            this.state.fetched_menu_sections &&
            this.state.fetched_menu_sections.length > 0
        ) {
            section_options = this.state.fetched_menu_sections.map(menu_section => {
                return (
                    <Dropdown.Item
                        key={menu_section._id}
                        onClick={this.handleSelection}
                        name={menu_section.menu_section_name}
                    >
                        {menu_section.menu_section_name}
                    </Dropdown.Item>
                );
            });
        }



        let item_options = null;
        if (
            this.state &&
            this.state.fetched_items &&
            this.state.fetched_items.length > 0
        ) {
            item_options = this.state.fetched_items.map(item => {
                return (
                    <Dropdown.Item
                        key={item._id}
                        onClick={this.handleItemSelection}
                        name={item._id}
                    >
                        {item.itemName}
                    </Dropdown.Item>
                );
            });
        }
        //end sun


        return (
            <div>
                {redirectvar}
                <Navbar />
                <br />
                <Button variant="link"><Link to="/updatemenu"><Button variant="link">Navigate to Update Menu</Button></Link></Button>
                <br /> <br />
                <Container fluid={true}>
                    <Row>
                        <Col>
                            <Card style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={item_placeholder} />
                                <Card.Body>
                                    <Card.Title>Update</Card.Title>
                                    <Card.Text>
                                        <form onSubmit={this.onSubmitUpdate}>
                                            <div class="form-group">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                                                        Items
                                                        </Dropdown.Toggle>
                                                    <Dropdown.Menu>{item_options}</Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Edit items</label>
                                                <input type="text"
                                                    class="form-control"
                                                    onChange={this.onChangeHandler}
                                                    name="item_response_item_name"
                                                    required={true}
                                                    placeholder=""
                                                    defaultValue={this.state.item_response_item_name}
                                                />
                                                <small id="emailHelp" class="form-text text-muted"></small>
                                            </div>
                                            {/* //description */}
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Description</label>
                                                <input type="text"
                                                    class="form-control"
                                                    onChange={this.onChangeHandler}
                                                    name="item_response_item_description"
                                                    required={true}
                                                    placeholder=""
                                                    defaultValue={this.state.item_response_item_description}
                                                />
                                            </div>
                                            {/* price */}
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Price</label>
                                                <input type="text"
                                                    pattern="[0-9]+"
                                                    class="form-control"
                                                    onChange={this.onChangeHandler}
                                                    name="item_response_item_price"
                                                    required={true}
                                                    placeholder=""
                                                    defaultValue={this.state.item_response_item_price}
                                                />
                                            </div>
                                            {updateStatusPopupMsg}
                                            <button type="submit" class="btn btn-primary">Update</button>
                                        </form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={item_placeholder} />
                                <Card.Body>
                                    <Card.Title>Add Items</Card.Title>
                                    <Card.Text>
                                        <form onSubmit={this.onAddSubmit}>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Item Name</label>
                                                <input type="text"
                                                    class="form-control"
                                                    onChange={this.onChangeHandler}
                                                    name="addItemName"
                                                    required={true}
                                                    aria-describedby="emailHelp"
                                                    placeholder="Add new Items here.."
                                                />
                                                <small id="emailHelp" class="form-text text-muted"></small>
                                            </div>
                                            {/* //description */}
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Description</label>
                                                <input type="text"
                                                    class="form-control"
                                                    onChange={this.onChangeHandler}
                                                    name="addItemDescription"
                                                    required={true}
                                                    placeholder="Add description here.."
                                                />
                                            </div>
                                            {/* price */}
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Price</label>
                                                <input type="text"
                                                    pattern="[0-9]+"
                                                    class="form-control"
                                                    onChange={this.onChangeHandler}
                                                    name="addItemPrice"
                                                    required={true}
                                                    placeholder="Add price here.."
                                                />
                                                <small id="emailHelp" class="form-text text-muted"></small>
                                            </div>
                                            {/* section */}
                                            <div class="form-group">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                                                        Section
                                                        </Dropdown.Toggle>
                                                    <Dropdown.Menu>{section_options}</Dropdown.Menu>
                                                </Dropdown>
                                                <label for="exampleInputEmail1">Section Name</label>
                                                <input type="text"
                                                    class="form-control"
                                                    onChange={this.onChangeHandler}
                                                    name="addItemSection"
                                                    required={true}
                                                    disabled={true}
                                                    defaultValue={this.state.menu_section_name}
                                                    placeholder="Add section here.."
                                                />
                                                <small id="emailHelp" class="form-text text-muted"></small>
                                            </div>
                                            {popupMsg}
                                            <button type="submit" class="btn btn-primary">Add</button>
                                        </form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '24rem' }}>
                                <Card.Body>
                                    <Card.Title>Delete Section</Card.Title>
                                    {DisplayItemsForDelete}
                                    {deletePopupMsg}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}



Items.propTypes = {
    addItemAction: propTypes.func.isRequired,
    updateItemAction: propTypes.func.isRequired,
    deleteItemAction : propTypes.func.isRequired,
    ITEM: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    ITEM: state.itemReducer.itemState
})




export default connect(mapStateToProps, { addItemAction, deleteItemAction, updateItemAction })(Items)