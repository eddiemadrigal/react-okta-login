import React from "react";
import { Redirect } from "react-router-dom";
import SignInSide from "./SignInSide";
import { useOktaAuth } from "@okta/okta-react";

const Login = ({ issuer }) => {
 const { authState } = useOktaAuth();

 if (authState.isPending) {
  return <div>Loading...</div>;
 }
 return authState.isAuthenticated ? (
  <Redirect to={{ pathname: "/" }} />
 ) : (
  <SignInSide issuer={issuer} />
 );
};

export default Login;
