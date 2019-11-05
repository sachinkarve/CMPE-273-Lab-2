import React, { Component } from 'react';
import axios from 'axios';
import { Form, Modal, Alert, ListGroup, InputGroup, FormControl, Button } from "react-bootstrap";
import URL from '../config'


import propTypes from 'prop-types'
import { connect } from 'react-redux';
import { sendMsgAction, getMsgAction } from '../actions/messagingAction'


class MessageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            visibility: false,
            messageText: '',
            messages: [],
            x: ""
        };

        this.handleClose = this.handleClose.bind(this);
        this.send = this.send.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.getMessage = this.getMessage.bind(this);
    }


    componentWillReceiveProps(incomingProps) {
        console.log(`****-----props came in with items----****`);
        console.log(incomingProps.MESSAGE);
        if (incomingProps.MESSAGE) {

            this.setState({
                messageText: "",
            });
            this.getMessage();
        }
    }





    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getMessage = () => {
        console.log(`****-----inside get method------*****`);
        //this.props.getMsgAction(this.props.order._id);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(`${URL}/messaging/get/${this.props.order._id}`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        messages: response.data
                    });
                    console.log(`****----response.data--of GET------******`);
                    console.log(response.data);
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err);
                }
            });
    }


    handleClose = () => {
        this.setState({
            visibility: false
        })
    }

    send = () => {
        let data = {
            order_id: this.props.order._id,
            sender_name: localStorage.getItem("name"),
            messageText: this.state.message
        }
        console.log(data);
        this.props.sendMsgAction(data)
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        // axios.post(`${URL}/messaging/send`, data)
        //     .then(response => {
        //         if (response.data) {
        //             this.setState({
        //                 messageText : "",
        //                 // messages: response.data.messages,
        //                 visibility: true,
        //             });
        //             this.getMessage();

        //             console.log(`****----response.data--*******`);
        //             console.log(response.data);
        //         }
        //     })
        //     .catch(err => {
        //         if (err.response && err.response.data) {
        //             console.log(err);
        //         }
        //     });
    }

    handleShow = () => {
        console.log(`inside handleshow`);
        console.log(`calling:::    this.getMessage()`);
        this.getMessage();
        this.setState({
            visibility: true
        })
    }


    render() {

        let msg = this.state.messages.map(msg => {
            return (
                <div><h6>
                    <ListGroup.Item>
                        <Alert variant="light">
                            {msg.sender_name}: {msg.messageText}</Alert>
                    </ListGroup.Item>
                </h6></div>
            )
        })

        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Chat
                </Button>

                <Modal show={this.state.visibility} onHide={this.handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><ul>{msg}</ul></Modal.Body>

                    <div>
                        <input type="text"
                            class="form-control"
                            onChange={this.onChangeHandler}
                            name="message"
                            required={true}
                            placeholder="new one"
                        />
                    </div>



                    {/* <InputGroup className="mb-3">
                    <FormControl  name="message" required={true} onChange={this.onChangeHandler} placeholder="Type your message here..." />
                    </InputGroup> */}
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.send}>Send</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


MessageModal.propTypes = {
    placeOrderActions: propTypes.func.isRequired,
    MESSAGE: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    MESSAGE: state.messagingReducer.msgState
})

export default connect(mapStateToProps, { sendMsgAction })(MessageModal)