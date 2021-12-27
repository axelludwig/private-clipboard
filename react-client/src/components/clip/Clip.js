import React, { Component } from "react";
import Moment from "react-moment";
import moment from "moment";
import { IconButton, Tooltip, Grid } from "@material-ui/core";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Clip.css";
import Image from "mui-image";

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
      postDateMoment: "",
      imagesrc: raw.imagesrc,
    };
    this.state.postDateMoment = moment(this.state.postDate).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
  }

  componentDidMount() {}

  handleContentClick() {}

  deleteButton = (id) => {
    this.props.deleteClipEvent(id);
  };

  download = (url) => {
    window.location.replace("http://localhost:8000/images/" + url);
  };

  render() {
    let image;
    if (this.state.imagesrc != "null") {
      image = (
        <Image
          src={"http://localhost:8000/images/" + this.state.imagesrc}
          className="image"
          shift="top"
          distance="2rem"
          shiftDuration={320}
        />
      );
    }

    return (
      <div className="clip" id={this.state.id}>
        <Grid className="grid" container spacing={0}>
          <Grid item xs={8} onClick={() => this.handleContentClick()}>
            <Tooltip title="Copy content to clipboard">
              <div className="content">{this.state.content}</div>
            </Tooltip>
          </Grid>
          <Grid className="date" item xs={2}>
            <Tooltip title={this.state.postDateMoment}>
              <Moment format="DD/MM/YYYY">{this.state.postDate}</Moment>
            </Tooltip>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Download image">
              <IconButton
                onClick={() => this.download(this.state.imagesrc)}
                aria-label="delete"
              >
                <CloudDownloadIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => this.deleteButton(this.state.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        {image}
      </div>
    );
  }
}

export default Clip;
