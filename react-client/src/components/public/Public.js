import React, { Component } from 'react';

import NewClip from '../newclip/NewClip'
import Clips from '../clips/Clips'
// import './Public.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


// const socket = openSocket('http://localhost:8001', { transports: ['websocket'] });
// const socket = socketIOClient('http://localhost:8001');

class Public extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res: 'temp',
      Clips: []
    }


    // socket.on('update', () => {
    //   this.updateClips();
    // })
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
    return (< Clips private={false} />);
  }
}

export default Public;
