import React, { Component } from 'react';
// import './Public.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Form, Container, Row, Col, } from 'react-bootstrap';

// const socket = openSocket('http://localhost:8001', { transports: ['websocket'] });

class NewClip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            res: 'temp',

            value: ''
        }

    }

    componentDidMount() {

    }

    handleClick = () => {
        fetch("http://localhost:8000/clips", {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: 'test55 post 5',
                private: 'true',
            })
        })
            .then((res) => { })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                new clip
                <Form>
                    <Form.Group controlId="formBasicEmail">

                        <Container>
                            <Row>
                                <Col sm="2">
                                    <Form.Label>Email address</Form.Label>
                                </Col>
                                <Col sm="8">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Col>

                                <Col sm="2">
                                    <Button style={{}} variant="light">Light</Button> {' '}
                                </Col>

                            </Row>
                        </Container>
                    </Form.Group>



                    <Button variant="primary" onClick={this.handleClick} >
                        Submit
                    </Button>
                </Form>
            </div>

        );
    }
}

export default NewClip;
