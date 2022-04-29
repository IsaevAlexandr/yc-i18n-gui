import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "client/App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "client/components/Theme";

const runApp = () =>
  hydrate(
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <App />
        <CssBaseline />
      </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );

runApp();

if (module.hot) {
  module.hot.accept();
}
