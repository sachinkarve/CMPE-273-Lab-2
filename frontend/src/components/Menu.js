import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import Navbar from './Navbar.js'
import { Row, Button, Container, Col } from 'react-bootstrap';

class Menu extends Component {
    render() {
        let redirectvar = null;
        let profileRender = null;

        if (!localStorage.getItem('token')) {
            redirectvar = <Redirect to="/login" />
        }

        return (
            <div>
                {redirectvar}
                <Navbar />
                <Container fluid={true}>
                    <br />
                    <Row>
                        <Col xs={1}></Col>

                        <Col xs={5}>
                            <Row>
                                <Link to="/sections"><Button variant="primary">Sections</Button></Link>
                            </Row><br />
                            <Row>
                                <Link to="/items"><Button variant="primary">Items</Button></Link>
                            </Row><br />
                            <Row>
                                <Link to="/viewitemandsections"><Button variant="primary">View sectionwise Items</Button></Link>
                            </Row>
                        </Col>
                        <Col xs={4}>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Menu;