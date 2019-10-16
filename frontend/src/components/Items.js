import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import Navbar from './Navbar.js'
import item_placeholder from '../images/item_placeholder.jpg'
import { Row, Card, Alert, Container, Button, Col } from 'react-bootstrap';
import URL from '../config'

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
            newItemPrice: ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.updateFieldHandler = this.updateFieldHandler.bind(this);
        this.onAddSubmit = this.onAddSubmit.bind(this);
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onUpdateHandler = this.onUpdateHandler.bind(this);
    }


    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateFieldHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            editComponentFlag: null,
            updateStatus: null,
            newItemName: "",
            newItemDescription: "",
            newItemPrice: "",
            updateSearchMsg : null
        });
    }


    onSubmitUpdate = (e) => {
        e.preventDefault();
        const data = {
            item_id: this.state.item_id,
            newItemName: this.state.item_response_item_name,
            newItemDescription: this.state.item_response_item_description,
            newItemPrice: this.state.item_response_item_price
        }
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/item/update`, data)
            .then(response => {
                console.log(response.data);
                this.setState({ updateStatus: response.data })
            }).catch(err => {
                this.setState({ updateStatus: err.status })
            });
    }


    onUpdateHandler = (e) => {
        console.log(`inside onUpdateHandler`);
        console.log(this.state.updateItemName);
        e.preventDefault();
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.get(`${URL}/item/edititem/${this.state.updateItemName}`)
            .then(Response => {
                if (Response.data !== "NO_ROW_RETURNED") {
                    console.log(Response.data)
                    this.setState({
                        item_id: Response.data.item_id,
                        item_response_item_name: Response.data.item_name,
                        item_response_item_description: Response.data.item_description,
                        item_response_item_price: Response.data.item_price,
                        editComponentFlag: true,
                        updateSearchMsg: "SUCCESS"
                    })
                } else {
                    console.log(`no data received`);
                    this.setState({
                        updateSearchMsg: "NO_ROW_RETURNED"
                    })
                }
            })
            .catch(err => {
                console.log(`error received:: ${err}`);
            })
    }



    onAddSubmit = (e) => {
        //prevent page from refresh
        console.log(`inside add Items ka submit`)
        e.preventDefault();
        const data = {
            itemName: this.state.addItemName,
            itemDescription: this.state.addItemDescription,
            itemPrice: this.state.addItemPrice,
            menu_section_name: this.state.addItemSection,
            user_id: this.state.user_id
        }
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/item/additem`, data)
            .then(response => {
                this.setState({ addResponseMsg: response.data[0].status })
            }).catch(err => {
                this.setState({ addResponseMsg: err.status })
            });
    }


    onDeleteSubmit = (e) => {
        //prevent page from refresh
        console.log(`inside delete Item ka submit`)
        e.preventDefault();
        const data = {
            item_name: this.state.deleteItemName
        }
        console.log(`data obj below`);
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/item/deleteitem`, data)
            .then(response => {
                this.setState({
                    deleteResponseMsg: response.data[0].status
                })
            }).catch(err => {
                this.setState({
                    deleteResponseMsg: err.status
                })
            });
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
            case "ITEM_DOES_NOT_EXIST":
                deletePopupMsg = (<Alert variant="warning">Item doesn't Exist!!</Alert>)
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

        if (this.state.editComponentFlag) {
            ItemUpdateComponent = (
                <div>
                    <Card style={{ width: '24rem' }}>
                        <Card.Img variant="top" src={item_placeholder} />
                        <Card.Body>

                            <Card.Title>Update</Card.Title>
                            <Card.Text>
                                <form onSubmit={this.onSubmitUpdate}>
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
                </div>)
        }

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
                                <Card.Body>
                                    <Card.Title>Update Item</Card.Title>
                                    <Card.Text>
                                        <form onSubmit={this.onUpdateHandler}>
                                            <div class="form-group">
                                                <input type="text"
                                                    class="form-control"
                                                    name="updateItemName"
                                                    onChange={this.updateFieldHandler}
                                                    required={true}
                                                    placeholder="Items to be updated.."
                                                />
                                            </div>
                                            {updatePopupMsg}
                                            <button type="submit" class="btn btn-primary">Update</button>
                                        </form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            <br />
                            <br />

                            <Card style={{ width: '24rem' }}>
                                <Card.Body>
                                    <Card.Title>Delete Item</Card.Title>
                                    <Card.Text>
                                        <form onSubmit={this.onDeleteSubmit}>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Delete Items</label>
                                                <input type="text"
                                                    class="form-control"
                                                    name="deleteItemName"
                                                    onChange={this.onChangeHandler}
                                                    required={true}
                                                    placeholder="Items to be deleted.."
                                                />
                                            </div>
                                            {deletePopupMsg}
                                            <button type="submit" class="btn btn-primary">Delete</button>
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
                                                <label for="exampleInputEmail1">Section Name</label>
                                                <input type="text"
                                                    class="form-control"
                                                    onChange={this.onChangeHandler}
                                                    name="addItemSection"
                                                    required={true}
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
                            {ItemUpdateComponent}
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}
export default Items