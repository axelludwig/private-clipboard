import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

// import { Button, Form, Container, Row, Col, } from 'react-bootstrap';
import {
  Button,
  IconButton,
  Switch,
  Tooltip,
  makeStyles,
  Theme,
  Checkbox,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DeleteIcon from "@material-ui/icons/Delete";

import { PhotoCamera } from "@material-ui/icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Clip.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";

class Clip extends Component {
  constructor(props) {
    super(props);
    let raw = this.props.raw;
    this.state = {
      id: raw.id,
      content: raw.content,
      private: raw.private,
      postDate: raw.time,
      imagesrc: raw.imagesrc,
    };
  }

  componentDidMount() {}

  deleteButton = (id) => {
    this.props.deleteClipEvent(id);
  };

  render() {
    // var image = <Image src="http://localhost:8000/image/${this.state.imagesrc}" fluid />
    if (this.state.imagesrc) var image = <Image className="image" src={"http://localhost:8000/images/" + this.state.imagesrc} fluid />
    var image = (
      <Image
        src={"http://localhost:8000/images/" + this.state.imagesrc}
        fluid
      />
    );

    return (
      // <div className='clip' id={this.state.id}>
      <div className='clip' id={this.state.id}>
      <div className="clip" id={this.state.id}>
        <Container>
          <Row>
            <Col sm={4}> Content : {this.state.content} </Col>
            <Col sm={4}>
              private :{" "}
              <Form.Check
                readOnly
                checked={this.state.private}
                type="checkbox"
              />
            </Col>
            <Col sm={3}> {this.state.postDate} </Col>
            <Col sm={1}>
              {" "}
              <IconButton
                onClick={() => this.deleteButton(this.state.id)}
                aria-label="delete"
              >
                {" "}
                <DeleteIcon />{" "}
              </IconButton>{" "}
            </Col>
          </Row>
          <div className="imagecontainer">
            {image}
          </div>
        </Container>
      </div>
    );
  }
}

export default Clip;
