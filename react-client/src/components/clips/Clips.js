import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Clip from "../clip/ClipFunction";
import "./Clips.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CustomScroller from "react-custom-scroller";
import CustomScroll from "react-custom-scroll";
import Divider from "../Divider/Divider";

const socket = socketIOClient("http://localhost:8001");

class Clips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clips: [],
      private: props.private,
      lastAddedClip: null
    };

    socket.on("update", () => {
      console.log("updated");
      this.updateClips();
    });
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#212121";
    this.fetchClips();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.newClipProps &&
      nextProps.newClipProps.private == this.state.private &&
      nextProps.newClipProps != this.state.lastAddedClip
    ) {
      this.updateClips(nextProps.newClipProps);
      this.state.lastAddedClip = nextProps.newClipProps;
    }
  }

  deteleClip(id) {
    let array = this.state.clips.filter(item => {
      return item.id != id;
    });
    this.setState({ clips: array });
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    }).catch(error => {
      console.error(error);
    });
  }

  fetchClips = () => {
    let access = this.props.private ? "private" : "public";
    fetch("http://localhost:8000/clips?access=" + access, {
      crossDomain: true,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({ clips: json });
      })
      .catch(error => {
        console.error(error);
      });
  };

  updateClips = newClip => {
    if (newClip != null) this.state.clips.unshift(newClip);
    this.setState({ clips: this.state.clips });
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

  deleteClipEvent = id => {
    this.deteleClip(id);
  };

  render() {
    let domClips = [];
    this.state.clips.map(c => {
      domClips.push(
        <span key={c.id}>
          <Clip deleteClipEvent={this.deleteClipEvent} raw={c} key={c.id} />
          <Divider />
        </span>
      );
      return null;
    });

    return (
      <div className="clips">
        {/* clips: {this.state.clips.length} */}
        {domClips}
      </div>
    );
  }
}

export default Clips;
