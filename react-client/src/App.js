import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import Public from './components/public/Public'
import Private from './components/private/Private'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const socket = socketIOClient('http://localhost:8001');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res: 'temp'
    }



  }

  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#212121"

  }



  handleClick = (t) => {
    if (1 == t) window.location.replace('public')
    else if (2 == t) window.location.replace('private')
    else if (3 == t) {
      socket.emit('test');
      socket.on('test2', () => {
        console.log('test opk')
        this.setState({
          res: 'ça marche'
        })
      })
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.res}

        <div className='switch'>
          <Button onClick={this.handleClick.bind(this, 1)} variant="primary">public</Button>{' '}
          <Button onClick={this.handleClick.bind(this, 1)} variant="primary">private</Button>{' '}
          <Button onClick={this.handleClick.bind(this, 3)} variant="secondary">socket</Button>{' '}
        </div>

        <Switch>
          <Redirect exact from='/' to='/public' />
          <Route path="/public" render={(props) => (
            <Public {...props} propssocket={socket} />
          )} />
          <Route path="/private" render={(props) => (
            <Public {...props} propssocket={socket} />
          )} exact />
        </Switch>

      </div>
    );
  }
}

export default App;
