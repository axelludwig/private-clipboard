import React, { Component } from "react";
import { Link, BrowserRouter as Switch, Route } from "react-router-dom";

import { styled } from "@mui/material/styles";
import CustomScroller from "react-custom-scroller";
import CustomScroll from "react-custom-scroll";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";

import { purple } from "@mui/material/colors";

import Frame from "./components/Frame/Frame";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider
} from "@mui/material/styles";

import { Button, ButtonGroup } from "@material-ui/core";
import { Stack } from "@mui/material";


const ColorButton = styled(Button)({
  width: "100%",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#544CFF !important",
    color: "#000000 !important",
    border: "1px solid black !important",
    borderColor: "#000000"
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf"
  }
});

export default function App() {
  // const handleClick = () => {
  // if (3 === t) {
  //   socket.emit("test");
  //   socket.on("test2", () => {
  //     console.log("test opk");
  //     this.setState({
  //       res: "ça marche",
  //     });
  //   });
  // }
  // };

  const handleClick = pRoute => {
    // route = window.location.pathname.replace('/', '');
    // if (route == "") {
    // }
  };

  const getColorButton = (p) => {
    let res;
    switch (p) {
      case "/":
        res = <ColorButton
          onClick={() => handleClick("/")}
          className="selected-left"
          sx={{
            backgroundColor: "#756FFF",
            border: "1px solid #756FFF",
            borderTopLeftRadius: "0.5vw ",
            borderRadius: "0 !important",
          }}
          disableElevation
          component={Link}
          to="/"
        >
          public
        </ColorButton>
        break;

      default:
        break;
    }
    return res;
  }

  let publicButton = getColorButton('/');

  return (
    <div>
      <div className="app-component">
        <Switch className="switch">
          <Grid container>
            <Grid item xs={6}>
              {publicButton}
            </Grid>
            <Grid item xs={6}>
              <ColorButton
                onClick={() => handleClick("/private")}
                sx={{
                  backgroundColor: "#756FFF !important",
                  border: "1px solid #756FFF !important",
                  borderTopRightRadius: "0.5vw !important"
                  , borderRadius: "0 !important",
                }}
                component={Link}
                to="/private"
              >
                private
              </ColorButton>
            </Grid>
          </Grid>
          <Route
            exact
            path="/"
            render={props => <Frame {...props} context="public" />}
          />
          <Route
            path="/login"
            render={props => <Frame {...props} context="private" />}
          />
        </Switch>
      </div>
    </div>
  );
}
