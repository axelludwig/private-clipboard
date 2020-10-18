import React, { Component } from 'react';

import NewClip from '../newclip/NewClip'
import axios from 'axios'
// import './Public.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


// const socket = openSocket('http://localhost:8001', { transports: ['websocket'] });

class Public extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res: 'temp'
    }
  }

  componentDidMount() {

  }

  handleClick = () => {
    // axios({
    //   url: "http://localhost:8000",
    //   method: "GET"
    // })

    // console.log('click')
    fetch("http://localhost:8000", {
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

        <NewClip></NewClip>
      </div>

    );
  }
}

export default Public;
