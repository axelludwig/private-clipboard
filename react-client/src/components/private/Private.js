import React, { Component } from 'react';
import './Private.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


// const socket = openSocket('http://localhost:8001', { transports: ['websocket'] });

class Private extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res: 'temp'
    }



  }

  componentDidMount() {

  }



  handleClick = () => {
    // socket.emit('test');
    // socket.on('test2', () => {
    //   console.log('test opk')
    //   this.setState({
    //     res: 'ça marche'
    //   })
    // })
  }

  render() {
    return (
      <div>
        private
      </div>

    );
  }
}

export default Private;
