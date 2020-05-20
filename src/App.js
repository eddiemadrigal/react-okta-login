import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, LoginCallback } from "@okta/okta-react";
import LoginPage from "./components/pages/LoginPage";

const OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN;
const OKTA_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const config = {
 issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
 redirectUri: "http://localhost:3000/implicit/callback",
 clientId: `${OKTA_CLIENT_ID}`,
 pkce: true,
};

const App = () => {
 return (
  <Router>
   <Security {...config}>
    <Route path="/login" exact={true} component={LoginPage} />
    <Route path="/implicit/callback" component={LoginCallback} />
   </Security>
  </Router>
 );
};

export default App;
