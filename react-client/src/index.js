import React from "react";
import ReactDOM from "react-dom";

import { SnackbarProvider } from "notistack";
import Slide from "@material-ui/core/Slide";
import { StyledEngineProvider } from "@mui/material/styles";

import "./index.css";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.render(
  <SnackbarProvider
    maxSnack={1}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    TransitionComponent={Slide}
  >
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);
