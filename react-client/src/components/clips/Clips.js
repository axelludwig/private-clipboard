import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios';

import Clip from "../clip/Clip";
import "./Clips.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, IconButton, Checkbox, Grid, } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import CustomScroller from 'react-custom-scroller';

const socket = socketIOClient("http://localhost:8001");

class Clips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clips: [],
      privateClips: [],
      clipText: '',
      private: false,
      privateText: 'public',
      selectedFile: null,
      imagePreview: null,
      buttonText: 'Upload File!',
      backupFile: null,
      fileName: null
    };
    this.myRef = React.createRef()

    socket.on("update", () => {
      this.updateClips();
      console.log('updated');
    });
  }

  componentDidMount() {
    this.updateClips();
    console.log('ok');
  }

  addClip() {
    var json = {
      content: this.state.clipText,
      private: this.state.private,
      imagesrc: this.state.fileName
    }
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(json)
    })
      .then((res) => { return res.json(); })
      .then((res) => {
        json.id = res.id;
        var array = this.state.clips;
        array.push(json)
        this.setState({ clips: array })
        socket.emit("updateAll", "");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateClips = () => {
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        var array = [];
        json.map((clip) => {
          if (clip.private && this.props.private) array.push(clip)
          else if (!clip.private && !this.props.private) array.push(clip)
        });
        this.setState({ clips: array });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  deleteImage = (event) => {

    this.setState({
      imagePreview: null,
      selectedFile: null,
      buttonText: 'Upload File'
    })
  }

  handleSubmit = () => {
    if (null != this.state.selectedFile) this.uploadHandler();
    this.addClip();
  }

  handleCheck = () => {
    if (this.state.private) this.setState({ private: false, privateText: 'public' })
    else this.setState({ private: true, privateText: 'private' })
  }

  handleClick = (t) => {
    if (1 === t) window.location.replace('/')
    else if (2 === t) window.location.replace('private')
    // else if (3 === t) {
    //   socket.emit('test');
    //   socket.on('test2', () => {
    //     console.log('test opk')
    //     this.setState({
    //       res: 'ça marche'
    //     })
    //   })
    // }
  }

  handleChange = (event) => {
    this.setState({ clipText: event.target.value })
  }

  debug = () => {
    // console.log(this.state.selectedFile);
    window.scrollTo(0, document.body.scrollHeight);

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

  componentDidUpdate() {
  }

  deteleClip(id) {
    if (this.props.private) var localClips = this.state.privateClips;
    else var localClips = this.state.publicClips;
    localClips.filter((item) => { return item.id != id })
    this.setState({ clips: localClips });
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteClipEvent = (id) => {
    this.deteleClip(id);
  };

  // handleClick = () => {
  // };

  render() {
    // create image if necessary
    var image, deleteButton;
    if (null != this.state.imagePreview) {
      image = < img className='uploaded' src={this.state.imagePreview} />
      deleteButton = (<IconButton onClick={this.deleteImage} aria-label="delete"> <DeleteIcon /> </IconButton>)
    }

    // create clip and add it to the array
    var displayedClips = [];
    var length; var count = 0; var localClips = [];

    // if (this.props.private) localClips = this.state.privateClips;
    // else localClips = this.state.publicClips;

    length = this.state.clips.length


    this.state.clips.map((c, index) => {
      if (length - 1 == index) {
        displayedClips.push(
          <div id="lastClip">
            <Clip deleteClipEvent={this.deleteClipEvent} raw={c} key={c.id} />
          </div>)
      }
      else displayedClips.push(<Clip deleteClipEvent={this.deleteClipEvent} raw={c} key={c.id} />)
    })

    return <main>
      <div className='formClip'>
        <div className='switch'>
          <Button onClick={this.handleClick.bind(this, 1)} variant="primary">public</Button>{' '}
          <Button onClick={this.handleClick.bind(this, 2)} variant="primary">private</Button>{' '}
          <Button onClick={this.handleClick.bind(this, 3)} variant="secondary">socket</Button>{' '}
        </div>
        <div className='imageUpload'>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Button color="secondary" variant="contained" component="label" disableElevation >
                {this.state.buttonText} <input type="file" hidden onClick={event => event.target.value = null} onChange={this.fileChangedHandler} />
                {/* {this.state.buttonText} <input type="file" hidden on onClick={this.fileClickHandler} onChange={this.fileChangedHandler} /> */}
              </Button>
              {deleteButton}
            </Grid>
            <Grid item xs={9}>
              {image}
            </Grid>
          </Grid>
        </div>
        <input onChange={this.handleChange} value={this.state.clipText} type="text" placeholder="content" />
        <Checkbox checked={this.state.private} onChange={this.handleCheck} type="checkbox" label={this.state.privateText} />
        <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
        <Button variant="contained" onClick={this.debug}> debug </Button>
        <a href="#126">Click Me </a>

      </div>

      <div className="clips">
        clips {length} : {displayedClips}
      </div >
    </main>
  }
}

export default Clips;
