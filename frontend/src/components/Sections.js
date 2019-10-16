import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import Navbar from './Navbar.js'
import URL from '../config'

import { Row, Alert, Card, Container, Button, Col } from 'react-bootstrap';

class Sections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addSectionName: null,
            user_id: localStorage.getItem("user_id"),
            deleteSectionName: "",
            addResponseMsg: "",
            deleteResponseMsg: "",
            editSectionName: "",
            editGetStatus: "",
            updatePostStatus : "",
            dynamic_menu_section_name: "",
            dynamic_menu_section_id: "",
            updateFlag: null
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onAddSubmit = this.onAddSubmit.bind(this);
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onEditGet = this.onEditGet.bind(this);
    }

    onEditGet = (e) => {
        console.log(`inside onEditSubmit`);
        e.preventDefault();

        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.get(`${URL}/section/editsection/${this.state.editSectionName}`)
            .then(response => {
                console.log(response);
                this.setState({
                    dynamic_menu_section_name: response.data.menu_section_name,
                    dynamic_menu_section_id: response.data.menu_section_id,
                    updateFlag: true,
                    editGetStatus: "SUCCESS"
                })

            })
            .catch(err => {
                console.log(`error occured:: ${err}`);
                this.setState({
                    editGetStatus: "NO_ITEM_FOUND"
                })
            });
    }


    onUpdateSubmit = (e) => {
        console.log(`inside onUpdateSubmit`);
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const data = {
            dynamic_menu_section_name: this.state.dynamic_menu_section_name,
            dynamic_menu_section_id: this.state.dynamic_menu_section_id
        }
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/section/editsection`, data)
            .then(response => {
                console.log(response);
                this.setState({
                    updatePostStatus : "UPDATE_SUCCESSFUL"
                })
            })
            .catch(err => {
                console.log(`error occured:: ${err}`);
                this.setState({
                    updatePostStatus : "FAILED"
                })
            });
    }



    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    onChangeHandlerForEdit = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            updateFlag: null
        });

    }


    onAddSubmit = (e) => {
        //prevent page from refresh
        console.log(`inside add Sections ka submit`)
        e.preventDefault();
        const data = {
            sectionName: this.state.addSectionName,
            user_id: this.state.user_id
        }
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/section/addsection`, data)
            .then(response => {
                console.log("Response String : ", response.data[0].status);
                if (response.data[0].status === "SECTION_ADDED") {
                    this.setState({
                        addResponseMsg: "SECTION_ADDED"
                    })
                } else if (response.data[0].status === "SECTION_EXISTS") {
                    this.setState({
                        addResponseMsg: "SECTION_EXISTS"
                    })
                }
            }).catch(err => {
                console.log("Response String : ", err);
                if (err.status === "SECTION_ADDITION_FAILED") {
                    this.setState({
                        addResponseMsg: "SECTION_ADDITION_FAILED"
                    })
                }
            });
    }


    onDeleteSubmit = (e) => {
        //prevent page from refresh
        console.log(`inside delete Sections ka submit`)
        e.preventDefault();
        const data = {
            menu_section_name: this.state.deleteSectionName
        }
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/section/deletesection`, data)
            .then(response => {
                console.log("Response String : ", response.data[0].status);
                if (response.data[0].status === "SECTION_DELETED_SUCCESSFULLY") {
                    this.setState({
                        deleteResponseMsg: "SECTION_DELETED_SUCCESSFULLY"
                    })
                }
                else if (response.data[0].status === "SECTION_DOES_NOT_EXIST") {
                    this.setState({
                        deleteResponseMsg: "SECTION_DOES_NOT_EXIST"
                    })
                }
            }).catch(err => {
                console.log("Response String : ", err);
                this.setState({
                    deleteResponseMsg: "DELETION_FAILED"
                })
            });
    }


    render() {
        let popupMsg = null;
        let editGetpopupMsg = null;
        let updateComponent = null;
        let updateStatuspopupMsg = null;
        switch (this.state.addResponseMsg) {
            case "SECTION_ADDED":
                popupMsg = (<Alert variant="success">Section Added Successfully!!</Alert>)
                break;
            case "SECTION_EXISTS":
                popupMsg = (<Alert variant="warning">Section Exists!!</Alert>)
                break;
            case "SECTION_ADDITION_FAILED":
                popupMsg = (<Alert variant="danger">Addition Failed!!</Alert>)
                break;
            default:
                popupMsg = null;
        }

        switch (this.state.editGetStatus) {
            case "SUCCESS":
                editGetpopupMsg = (<Alert variant="success">Updation enabled!!</Alert>)
                break;
            case "NO_ITEM_FOUND":
                editGetpopupMsg = (<Alert variant="danger">Section Doesn't Exist!!</Alert>)
                break;
            default:
                editGetpopupMsg = null;
        }

        switch (this.state.updatePostStatus) {
            case "UPDATE_SUCCESSFUL":
                updateStatuspopupMsg = (<Alert variant="success">Updation Successful!!</Alert>)
                break;
            case "FAILED":
                updateStatuspopupMsg = (<Alert variant="danger">Updation Failed!!</Alert>)
                break;
            default:
                updateStatuspopupMsg = null;
        }

        let deletePopupMsg = null;
        switch (this.state.deleteResponseMsg) {
            case "SECTION_DELETED_SUCCESSFULLY":
                deletePopupMsg = (<Alert variant="success">Section Deleted Successfully!!</Alert>)
                break;
            case "DELETION_FAILED":
                deletePopupMsg = (<Alert variant="danger">Deletion failed!!</Alert>)
                break;
            case "SECTION_DOES_NOT_EXIST":
                deletePopupMsg = (<Alert variant="warning">Section doesn't Exist!!</Alert>)
                break;
            default:
                deletePopupMsg = null;
        }


        let redirectvar = null;
        if (!localStorage.getItem('token')) {
            redirectvar = <Redirect to="/login" />
        }

        if (this.state.updateFlag) {
            updateComponent = (
                <div>
                    <Card style={{ width: '24rem' }}>
                        <Card.Body>
                            <Card.Title>Update Section</Card.Title>
                            <Card.Text>
                                <form onSubmit={this.onUpdateSubmit}>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Section name</label>
                                        <input type="text"
                                            class="form-control"
                                            onChange={this.onChangeHandler}
                                            name="dynamic_menu_section_name"
                                            required={true}
                                            placeholder="Add new Sections here.."
                                            defaultValue={this.state.dynamic_menu_section_name}
                                        />
                                    </div>
                                    {updateStatuspopupMsg}
                                    <button type="submit" class="btn btn-primary">Update</button>
                                </form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        }



        return (
            <div>
                {redirectvar}
                <Navbar />
                <Container fluid={true}>
                    <br /><br />
                    <Link to="/updatemenu"><Button variant="link">Update Menu</Button></Link>
                    <br /><br />

                    <Row>
                        <Col>
                            <Card style={{ width: '24rem' }}>
                                <Card.Body>
                                    <Card.Title>Add Section</Card.Title>
                                    <Card.Text>
                                        <form onSubmit={this.onAddSubmit}>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Section name</label>
                                                <input type="text"
                                                    class="form-control"
                                                    onChange={this.onChangeHandler}
                                                    name="addSectionName"
                                                    required={true}
                                                    placeholder="Add new Sections here.."
                                                />
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
                                    <Card.Title>Update Search</Card.Title>
                                    <Card.Text>
                                        <form onSubmit={this.onEditGet}>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Section name</label>
                                                <input type="text"
                                                    class="form-control"
                                                    onChange={this.onChangeHandlerForEdit}
                                                    name="editSectionName"
                                                    required={true}
                                                    placeholder="Edit Sections here.."
                                                />
                                            </div>
                                            {editGetpopupMsg}
                                            <button type="submit" class="btn btn-primary">Edit</button>
                                        </form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '24rem' }}>
                                <Card.Body>
                                    <Card.Title>Delete Section</Card.Title>
                                    <Card.Text>
                                        <form onSubmit={this.onDeleteSubmit}>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Section name</label>
                                                <input type="text"
                                                    class="form-control"
                                                    name="deleteSectionName"
                                                    onChange={this.onChangeHandler}
                                                    required={true}
                                                    placeholder="Sections to be deleted.."
                                                />
                                            </div>
                                            {deletePopupMsg}
                                            <button type="submit" class="btn btn-primary">Delete</button>
                                        </form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <br /><br />
                    <Row>
                        <Col></Col>
                        <Col>{updateComponent}</Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Sections
