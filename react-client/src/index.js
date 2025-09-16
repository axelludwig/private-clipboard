import React from "react";
import ReactDOM from "react-dom";


import { SnackbarProvider } from "notistack";
import Slide from "@material-ui/core/Slide";
import { StyledEngineProvider } from "@mui/material/styles";

import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./index.css";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { DataProvider } from './services/dataContext';

require('dotenv').config();

console.log(process.env.REACT_APP_URL); // Should log 'mysecretkey'


const theme = createTheme({
  palette: {
    type: "dark"
  }
});

ReactDOM.render(
  <DataProvider>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      TransitionComponent={Slide}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </DataProvider>,
  document.getElementById("root")
);
