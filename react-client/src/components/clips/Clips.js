import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios';

import Clip from "../clip/Clip";
import "./Clips.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  IconButton,
  Checkbox,
  Grid
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

import CustomScroller from 'react-custom-scroller';
import NewClip from "../newclip/NewClip";
import Divider from "../Divider/Divider";
import { border, borderColor } from "@mui/system";

const socket = socketIOClient("http://localhost:8001");

class Clips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clips: [],
      clipText: '',
      private: false,
      selectedFile: null,
      imagePreview: null,
      buttonText: 'Upload File!',
      backupFile: null,
      fileName: null,
      newClip: null,
    };

    socket.on("update", () => {
      this.updateClips();
    });
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json)
    })
      .then((res) => { return res.json(); })
      .then((res) => {
        json.id = res.id;
        var array = this.state.clips;
        array.push(json)
        this.setState({ clips: array })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleSubmit = () => {
    if (null != this.state.selectedFile) this.uploadHandler();
    this.addClip();
  }

  handleCheck = () => {
    if (this.state.private) this.setState({ private: false })
    else this.setState({ private: true })
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

  componentDidMount() {
    this.updateClips();
  }

  componentDidUpdate() {
  }

  deteleClip(id) {
    var array = this.state.clips.filter((item) => { return item.id != id })
    this.setState({ clips: array });
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

  updateClips = () => {
    let access = this.props.private ? "private" : "public";
    fetch("http://localhost:8000/clips?access=" + access, {
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
        this.setState({ clips: json });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleClick = () => {
    // socket.emit('test');
    // socket.on('test2', () => {
    //   console.log('test opk')
    //   this.setState({
    //     res: 'ça marche'
    //   })
    // })
  };

  deleteClipEvent = (id) => {
    this.deteleClip(id);
  };

  render() {
    let domClips = [];
    this.state.clips.map((c) => {
      domClips.push(
        <span key={c.id}>
          <Clip deleteClipEvent={this.deleteClipEvent} raw={c} key={c.id} />
          <Divider />
        </span>
      );
      return null;
    });

    return <div>
      <CustomScroller className="clips">
        clips : {this.state.clips.length} {domClips}
      </CustomScroller>
    </div>;
  }
}

export default Clips;
