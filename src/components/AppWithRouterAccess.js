import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./Home";
import Login from "./auth/Login";
import Dashboard from "./Dashboard";
import LoggedOut from "./LoggedOut";

const AppWithRouterAccess = () => {
 const history = useHistory();
 const onAuthRequired = () => {
  history.push("/login");
 };

 return (
  <Security
   issuer=".okta.com/oauth2/default"
   clientId=""
   redirectUri={window.location.origin + "/implicit/callback"}
   onAuthRequired={onAuthRequired}
   pkce={true}
  >
   <Route path="/" exact={true} component={Home} />
   <SecureRoute path="/dashboard" component={Dashboard} />
   <Route path="/login" render={() => <Login issuer="/oauth2/default" />} />
   <Route path="/implicit/callback" component={LoginCallback} />
   <Route path="/logged_out" component={LoggedOut} />
  </Security>
 );
};
export default AppWithRouterAccess;
