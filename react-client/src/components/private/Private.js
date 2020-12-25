import React, { Component } from 'react';
import './Private.css';
import NewClip from '../newclip/NewClip'
import Clips from '../clips/Clips'

import 'bootstrap/dist/css/bootstrap.min.css';


// const socket = openSocket('http://localhost:8001', { transports: ['websocket'] });

class Private extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res: 'temp',
      Clips: []
    }
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



  handleClick = () => {

  }

  render() {
    return (
      <div>
        private
        <NewClip></NewClip>
        <Clips private={false}></Clips>
      </div>

    );
  }
}

export default Private;
