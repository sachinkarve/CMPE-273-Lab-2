import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import Navbar from './Navbar.js'
import URL from '../config'

import { Row, Dropdown,ListGroup, Alert, Card, Container, Button, Col } from 'react-bootstrap';

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
            updatePostStatus: "",
            dynamic_menu_section_name: "",
            dynamic_menu_section_id: "",
            fetched_menu_sections: [],
            menu_section_name_to_update: "",
            menu_section_id_to_update: "",

        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onAddSubmit = this.onAddSubmit.bind(this);
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.fetchSections = this.fetchSections.bind(this);

        this.fetchSections();

    }
    //sun
    componentWillMount() {
        this.fetchSections();
    }
    handleSelection = e => {
        e.preventDefault();
        let section_name = e.target.name;
        let section_details = this.state.fetched_menu_sections.filter(
            section => section.menu_section_name === section_name
        );
        console.log({ section_details });
        this.setState({
            menu_section_name_to_update: section_details[0].menu_section_name,
            menu_section_id_to_update: section_details[0]._id
        });
    };
    //handle section selection

    //Fetch Sections
    fetchSections = () => {
        axios
            .get(`${URL}/section/${localStorage.getItem("user_id")}`)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.setState({
                        fetched_menu_sections: response.data
                    });
                    console.log(`fetched menu section`);
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                }
            });
    };

    onUpdateSubmit = (e) => {
        console.log(`inside onUpdateSubmit`);
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const data = {
            dynamic_menu_section_name: this.state.dynamic_menu_section_name,
            section_id: this.state.menu_section_id_to_update,
            user_id: localStorage.getItem("user_id")
        }
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.post(`${URL}/section/editsection`, data)
            .then(response => {
                console.log(response);
                this.fetchSections();

                this.setState({
                    updatePostStatus: "UPDATE_SUCCESSFUL"
                })
            })
            .catch(err => {
                console.log(`error occured:: ${err}`);
                this.setState({
                    updatePostStatus: "FAILED"
                })
            });
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onAddSubmit = (e) => {
        //prevent page from refresh
        console.log(`add section`)
        e.preventDefault();
        const data = {
            sectionName: this.state.addSectionName,
            user_id: this.state.user_id
        }
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.post(`${URL}/section/addsection`, data)
            .then(response => {
                console.log(response.data);
                if (response.data === "SECTION_ADDED") {
                    this.setState({
                        addResponseMsg: "SECTION_ADDED"
                    })
                    this.fetchSections();
                } else if (response.data === "SECTION_EXISTS") {
                    this.setState({
                        addResponseMsg: "SECTION_EXISTS"
                    })
                }
            }).catch(err => {
                console.log(err);

                this.setState({
                    addResponseMsg: "SECTION_ADDITION_FAILED"
                })
            });
    }

    onDeleteSubmit = (e) => {
        //prevent page from refresh
        console.log(`inside delete Sections ka submit`)
        e.preventDefault();
        const data = {
            menu_section_id: e.target.name,
            user_id: this.state.user_id
        }
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.post(`${URL}/section/deletesection`, data)
            .then(response => {
                console.log(response.data);
                if (response.data === "SECTION_DELETED_SUCCESSFULLY") {
                    this.setState({
                        deleteResponseMsg: "SECTION_DELETED_SUCCESSFULLY"
                    })
                    this.fetchSections();

                }
                else if (response.data === "SECTION_DOES_NOT_EXISTS") {
                    this.setState({
                        deleteResponseMsg: "SECTION_DOES_NOT_EXIST"
                    })
                }
            }).catch(err => {
                this.setState({
                    deleteResponseMsg: "DELETION_FAILED"
                })
            });
    }

    render() {
        let popupMsg = null;
        let editGetpopupMsg = null;
        let updateComponent = null;
        let DisplaySectionsForDelete = null
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

        DisplaySectionsForDelete = this.state.fetched_menu_sections.map(section => {
            return (
                <div>
                    <Card style={{ width: '18rem' }}>
                        <ListGroup variant="flush">
                        <ListGroup.Item>
                        <label for="displaysections" >{section.menu_section_name}</label>
                        <Button variant="link" name={section._id} onClick={this.onDeleteSubmit}>Delete</Button>
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
        //end sun


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
                                        <form onSubmit={this.onUpdateSubmit}>

                                            <div>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                                                        Select Section
                                                        </Dropdown.Toggle>
                                                    <Dropdown.Menu>{section_options}</Dropdown.Menu>
                                                </Dropdown>
                                            </div>

                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Section name</label>
                                                <input type="text"
                                                    class="form-control"
                                                    onChange={this.onChangeHandler}
                                                    name="dynamic_menu_section_name"
                                                    required={true}
                                                    placeholder="Edit Sections here.."
                                                    defaultValue={this.state.menu_section_name_to_update}

                                                />
                                            </div>
                                            {editGetpopupMsg}
                                            {updateStatuspopupMsg}

                                            <button type="submit" class="btn btn-primary">Update</button>
                                        </form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '24rem' }}>
                                <Card.Body>
                                    <Card.Title>Delete Section</Card.Title>
                                    {DisplaySectionsForDelete}
                                    {deletePopupMsg}
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
