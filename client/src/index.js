import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StateProvider } from "./StateProvider/StateProvider";
import { reducer, initialState } from "./StateProvider/reducer";

ReactDOM.render(
  <>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </>,
  document.getElementById("root")
);
