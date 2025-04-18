import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./components/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Get client ID from environment variable
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
