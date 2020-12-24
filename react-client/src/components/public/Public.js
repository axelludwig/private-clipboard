import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

import NewClip from '../newclip/NewClip'
// import './Public.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


// const socket = openSocket('http://localhost:8001', { transports: ['websocket'] });
const socket = socketIOClient('http://localhost:8001');

class Public extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res: 'temp',
      Clips: []
    }


    socket.on('update', () => {
      this.updateClips();
    })
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
      // body: JSON.stringify({
      //   wstoken: 'any_token',
      //   wsfunction: 'any_function',
      //   moodlewsrestformat: 'json',
      //   username: 'user',
      //   password: 'pass',
      // })
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
    // axios({
    //   url: "http://localhost:8000",
    //   method: "GET"
    // })

    // console.log('click')
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
      // body: JSON.stringify({
      //   wstoken: 'any_token',
      //   wsfunction: 'any_function',
      //   moodlewsrestformat: 'json',
      //   username: 'user',
      //   password: 'pass',
      // })
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
      <div>
        public
        <Button onClick={this.handleClick.bind(this)} variant="warning">fetch</Button>{' '}
        <Button onClick={this.updateClips} variant="warning">update clips</Button>{' '}
        <Button onClick={this.debug} variant="warning">debug</Button>{' '}


        <NewClip></NewClip>
      </div>

    );
  }
}

export default Public;
