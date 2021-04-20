import React, { Component } from 'react';
import axios from 'axios';
import './NewClip.css';
import socketIOClient from "socket.io-client";
import Clips from '../clips/Clips'


import 'bootstrap/dist/css/bootstrap.min.css';

// import { Button, Form, Container, Row, Col, } from 'react-bootstrap';
import {
  Button,
  IconButton,
  Checkbox,
  Grid,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
// const socket = openSocket('http://localhost:8001', { transports: ['websocket'] });
const socket = socketIOClient("http://localhost:8001");

// socket.on("connection", (socket) => {
//   console.log("client connected");
//   socket.emit("update", "");
//   socket.on("test", () => {
//     console.log("sockets ok");
//     socket.emit("test2", "");
//   });
//   socket.on("disconnect", () => console.log("disconnected"));
// });

class NewClip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clipText: '',
      private: false,
      privateText: 'public',
      selectedFile: null,
      imagePreview: null,
      buttonText: 'Upload File!',
      backupFile: null,
      fileName: null,
      newClip: null
    }
  }

  componentDidMount() {
  }

  handleSubmit = () => {
    if (null != this.state.selectedFile) this.uploadHandler();
    var json = {
      content: this.state.clipText,
      private: this.state.private,
      imagesrc: this.state.fileName
    }
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json)
    })
      .then((res) => { return res.json(); })
      .then((res) => {
        json.id = res.id;
        this.setState({
          newClip: json
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleCheck = () => {
    if (this.state.private) this.setState({ private: false, privateText: 'public' })
    else this.setState({ private: true, privateText: 'private' })
  }

  debug = () => {
    console.log(this.state.selectedFile);
  }

  handleChange = (event) => {
    this.setState({ clipText: event.target.value })
  }

  deleteImage = (event) => {
    this.setState({
      imagePreview: null,
      selectedFile: null,
      buttonText: 'Upload File'
    })
  }

  fileChangedHandler = (event) => {
    const file = event.target.files[0]
    this.setState({
      backupFile: event.target.files[0],
      selectedFile: event.target.files[0],
      imagePreview: URL.createObjectURL(event.target.files[0]),
      buttonText: event.target.files[0].name,
      fileName: event.target.files[0].name
    })
  }

  uploadHandler = () => {
    const config = {
      onUploadProgress: progressEvent => {
        let progress = Math.round(progressEvent.loaded / progressEvent.total * 100) + '%';
      }
    };
    console.log(this.state.selectedFile)
    const formData = new FormData()
    formData.append('image', this.state.selectedFile, this.state.selectedFile.name,)
    axios.post('http://localhost:8000/image', formData, config);
  }

  render() {

    var image, deleteButton;
    if (null != this.state.imagePreview) {
      image = (
        < img className='uploaded' src={this.state.imagePreview} />

      )
      deleteButton = (<IconButton onClick={this.deleteImage} aria-label="delete"> <DeleteIcon /> </IconButton>)
      // < Button onClick = { this.deleteImage } variant = "outlined" > Default</Button >
    }

    return (
      <div>
        <div className='formClip'>
          <div className='imageUpload'>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Button color="secondary" variant="contained" component="label" disableElevation >
                  {this.state.buttonText} <input type="file" hidden onClick={event => event.target.value = null} onChange={this.fileChangedHandler} />
                  {/* {this.state.buttonText} <input type="file" hidden on onClick={this.fileClickHandler} onChange={this.fileChangedHandler} /> */}
                </Button>
                {deleteButton}
              </Grid>
              {/* <Typography variant="body1" gutterBottom> h4. Heading </Typography> */}
              <Grid item xs={9}>
                {image}
              </Grid>
            </Grid>
          </div>

          {/* <button onClick={this.uploadHandler}> {this.state.buttonText} </button> */}
          <input onChange={this.handleChange} value={this.state.clipText} type="text" placeholder="clip" />

          <Checkbox checked={this.state.private} onChange={this.handleCheck} type="checkbox" label={this.state.privateText} />
          <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
          <Button variant="contained" onClick={this.debug}> debug </Button>
        </div>

        <div clips>
          <Clips newClip={this.state.newClip} private={this.props.private}></Clips>
        </div>

      </div >
    );
  }
}

export default NewClip;
