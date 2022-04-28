import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./styles/GlobalStyle";
import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
