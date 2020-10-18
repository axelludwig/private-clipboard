import React, { Component } from 'react';
import axios from 'axios'
// import './Public.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Form, Container, Row, Col, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

// const socket = openSocket('http://localhost:8001', { transports: ['websocket'] });

const radios = [
    { name: 'Active', value: '1' },
    { name: 'Radio', value: '2' },
    { name: 'Radio', value: '3' },
];

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
        // axios({
        //   url: "http://localhost:8000",
        //   method: "GET"
        // })

        // console.log('click')
        fetch("http://localhost:8000", {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            // body: JSON.stringify({
            //   wstoken: 'any_token',
            //   wsfunction: 'any_function',
            //   moodlewsrestformat: 'json',
            //   username: 'user',
            //   password: 'pass',
            // })
        })
            .then((response) => response.text())
            .then((responseText) => {
                alert(responseText);
            })
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
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Col>

                                <Col sm="2">
                                    <Button style={{}} variant="light">Light</Button> {' '}
                                </Col>

                            </Row>
                        </Container>
                    </Form.Group>



                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        );
    }
}

export default NewClip;
