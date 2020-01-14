import ReactDOM from "react-dom";
import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./App";

import stores from "./core/stores";

// For debugging
window._____APP_STATE_____ = stores;

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
