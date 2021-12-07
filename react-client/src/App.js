import React, { Component } from "react";
import { Link, BrowserRouter as Switch, Route } from "react-router-dom";

import Public from "./components/Public/Public";
import Private from "./components/Private/Private";
import Frame from "./components/Frame/Frame";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";

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
  "&:hover": {
    backgroundColor: "#BA97FF",
  },
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: "temp",
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#212121";
  }

  handleClick = (t) => {
    // if (3 === t) {
    //   socket.emit("test");
    //   socket.on("test2", () => {
    //     console.log("test opk");
    //     this.setState({
    //       res: "ça marche",
    //     });
    //   });
    // }
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <ButtonGroup aria-label="outlined button group">
            <ColorButton component={Link} to="/" variant="contained">
              public
            </ColorButton>
            <ColorButton component={Link} to="/private" variant="contained">
              private
            </ColorButton>
            <Button onClick={this.handleClick.bind(this, 3)}>socket</Button>
          </ButtonGroup>

          <Route
            exact
            path="/"
            render={(props) => <Frame {...props} context="public" />}
          />
          <Route
            path="/private"
            render={(props) => <Frame {...props} context="private" />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
