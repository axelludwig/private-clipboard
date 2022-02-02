import React, { Component } from "react";
import { Link, BrowserRouter as Switch, Route } from "react-router-dom";

import Frame from "./components/Frame/FrameFunction";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { styled } from "@mui/material/styles";

import {
  Button,
  ButtonGroup,
} from "@material-ui/core";

const ColorButton = styled(Button)(({ theme }) => ({
  flex: "auto",
  width: "50%",
  color: "#ffffff",
  backgroundColor: "#9966ff",
  "&:hover": {
    backgroundColor: "#BA97FF",
    color: "#000000"
  },
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <div className="app-component">
        <Switch className="switch">
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
