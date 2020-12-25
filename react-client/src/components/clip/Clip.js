import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Clip.css';
import { Container, Row, Col, Form } from 'react-bootstrap';

class Clip extends Component {
    constructor(props) {
        super(props)
        let raw = this.props.raw;
        this.state = {
            id: raw.id,
            content: raw.content,
            private: raw.private,
            postDate: raw.time
        }
    }

    componentDidMount() {
    }



    render() {
        return (
            <div className='clip' id={this.state.id}>
                <Container>
                    <Row>
                        <Col sm={4}> Content : {this.state.content} </Col>
                        <Col sm={4}>
                           private : <Form.Check readOnly checked={this.state.private} type="checkbox" />
                        </Col>
                        <Col sm={4}> {this.state.postDate} </Col>

                    </Row>
                </Container>
            </div>

        );
    }
}

export default Clip;
