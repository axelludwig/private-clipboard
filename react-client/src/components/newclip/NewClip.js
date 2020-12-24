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
      clipText: '',
      private: false,
      privateText: 'public',
      value: ''
    }
  }

  componentDidMount() {

  }

  handleSubmit = () => {
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: this.state.clipText,
        private: this.state.private,
      })
    })
      .then((res) => { })
      .catch((error) => {
        console.error(error);
      });
  }

  handleCheck = () => {
    if (this.state.private) this.setState({ private: false, privateText: 'public' })
    else this.setState({ private: true, privateText: 'private' })
  }

  debug = () => {
    console.log(this.state.clipText);
    console.log(this.state.private)
  }

  handleChange = (event) => {
    this.setState({ clipText: event.target.value })
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
                  <Form.Label> New clip</Form.Label>
                </Col>
                <Col sm="6">
                  <Form.Control onChange={this.handleChange} value={this.state.clipText} type="text" placeholder="clip" />
                </Col>
                <Col sm="2">
                  <Form.Check checked={this.state.private} onChange={this.handleCheck} type="checkbox" label={this.state.privateText} />
                </Col>
                <Col sm="2">
                  <Button variant="light" onClick={this.handleSubmit}>Submit</Button>
                </Col>
                <Button onClick={this.debug}></Button>
              </Row>
            </Container>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default NewClip;
