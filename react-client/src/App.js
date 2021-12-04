import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

import Public from './components/Public/Public'
import Private from './components/Private/Private'
import Frame from './components/Frame/Frame'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

import {
  Button,
  ButtonGroup,
  IconButton,
  Checkbox,
  Grid,
} from "@material-ui/core";

// const socket = socketIOClient('http://localhost:8001');

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#9966ff",
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

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

        {/* <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        > */}

        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
          <ColorButton variant="contained">Custom CSS</ColorButton>
        </ButtonGroup>

        <div className='switch'>
          <Button onClick={this.handleClick.bind(this, 1)} variant="primary">public </Button>{' '}
          <Button onClick={this.handleClick.bind(this, 2)} variant="primary">private </Button>{' '}
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
