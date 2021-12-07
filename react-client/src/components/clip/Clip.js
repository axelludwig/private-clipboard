import React, { Component } from "react";
import Moment from "react-moment";

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
  Item,
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

const axios = require("axios");

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

  handleContentClick() {}

  deleteButton = (id) => {
    this.props.deleteClipEvent(id);
  };

  render() {
    let image;
    if (this.state.imagesrc != "null") {
      image = (
        <Image
          src={"http://localhost:8000/images/" + this.state.imagesrc}
          fluid
          className="image"
        />
      );
    }

    return (
      <div className="clip" id={this.state.id}>
        <Grid className="grid" container spacing={0}>
          <Grid
            className="content"
            item
            xs={6}
            onClick={() => this.handleContentClick()}
          >
            Content : {this.state.content}
          </Grid>
          <Grid item xs={5}>
            <Moment format="MMMM Do YYYY, h:mm:ss a">
              {this.state.postDate}
            </Moment>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => this.deleteButton(this.state.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        {image}
      </div>
    );
  }
}

export default Clip;
