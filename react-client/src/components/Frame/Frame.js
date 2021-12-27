import React, { Component } from "react";

import NewClip from "../newclip/NewClipFunction";
import Clips from "../clips/Clips";

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      private: this.props.context == "private" ? true : false,
      Clips: [],
    };
  }

  componentDidMount() {
    this.updateClips();
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
        this.setState({ Clips: json });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  debug = () => {
    console.log(this.state.Clips);
  };

  handleClick = () => {
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((responseText) => {
        alert(responseText);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="frame-component">
        <NewClip />
        <Clips private={this.state.private} />
      </div>
    );
  }
}

export default Frame;
