import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Public from './components/Public/Public'
import Private from './components/Private/Private'
import Frame from './components/Frame/Frame'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// const socket = socketIOClient('http://localhost:8001');

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
    if (1 === t) window.location.replace('/')
    else if (2 === t) window.location.replace('private')
    // else if (3 === t) {
    //   socket.emit('test');
    //   socket.on('test2', () => {
    //     console.log('test opk')
    //     this.setState({
    //       res: 'ça marche'
    //     })
    //   })
    // }
  }

  render() {
    return (
      <div className="app">
        {/* {this.state.res} */}

        <div className='switch'>
          <Button onClick={this.handleClick.bind(this, 1)} variant="primary">public</Button>{' '}
          <Button onClick={this.handleClick.bind(this, 2)} variant="primary">private</Button>{' '}
          <Button onClick={this.handleClick.bind(this, 3)} variant="secondary">socket</Button>{' '}
        </div>

        <Switch>
          <Route exact path="/" render={(props) => (
            <Frame {...props}
             context="public" 
             //  propssocket={socket} 
             />
             )} />
          <Route path="/private" render={(props) => (
            <Frame {...props}
            context="private" 
            //  propssocket={socket} 
            />
          )} />
        </Switch>
        {/* <Redirect from='/' to='/public' exact /> */}

      </div>
    );
  }
}

export default App;
