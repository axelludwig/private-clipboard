import React, { Component } from 'react';

import NewClip from '../newclip/NewClip'
import Clips from '../clips/Clips'

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      private: this.props.context == "private" ? true : false,
      res: 'temp',
      Clips: []
    };
  }

  componentDidMount() {
    this.updateClips();
  }

  updateClips = () => {
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.setState({ Clips: json })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  debug = () => {
    console.log(this.state.Clips);
  }

  handleClick = () => {
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
    })
      .then((response) => response.text())
      .then((responseText) => {
        alert(responseText);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="frame-component">
        <NewClip />
        {/* public
        <Button onClick={this.handleClick.bind(this)} variant="warning">fetch</Button>{' '}
        <Button onClick={this.updateClips} variant="warning">update clips</Button>{' '}
        <Button onClick={this.debug} variant="warning">debug</Button>{' '} */}

        <Clips private={this.state.private} />
      </div>
    );
  }
}

export default Frame;