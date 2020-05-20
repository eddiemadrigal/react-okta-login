import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import OktaAuth from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";

const useStyles = makeStyles((theme) => ({
 root: {
  height: "100vh",
 },
 image: {
  backgroundImage: "url(https://source.unsplash.com/random)",
  backgroundRepeat: "no-repeat",
  backgroundColor:
   theme.palette.type === "light"
    ? theme.palette.grey[50]
    : theme.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
 },
 paper: {
  margin: theme.spacing(8, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
 },
 avatar: {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
 },
 form: {
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
 },
 submit: {
  margin: theme.spacing(3, 0, 2),
 },
}));

const LoginForm = ({ issuer }) => {
 const classes = useStyles();
 const { authService } = useOktaAuth();
 const [sessionToken, setSessionToken] = useState();
 const [username, setUsername] = useState();
 const [password, setPassword] = useState();

 const handleSubmit = (e) => {
  e.preventDefault();
  const oktaAuth = new OktaAuth({ issuer: issuer });
  oktaAuth
   .signIn({ username, password })
   .then((res) => {
    const sessionToken = res.sessionToken;
    setSessionToken(sessionToken);
    // sessionToken is a one-use token, so make sure this is only called once
    authService.redirect({ sessionToken });
   })
   .catch((err) => console.log("Found an error", err));
 };

 const handleUsernameChange = (e) => {
  setUsername(e.target.value);
 };

 const handlePasswordChange = (e) => {
  setPassword(e.target.value);
 };

 if (sessionToken) {
  // Hide form while sessionToken is converted into id/access tokens
  return null;
 }

 return (
  <form onSubmit={handleSubmit} className={classes.form}>
   <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    label="User Name"
    name="username"
    autoComplete="username"
    autoFocus
    id="username"
    type="text"
    value={username}
    onChange={handleUsernameChange}
   />
   <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    name="password"
    label="Password"
    id="password"
    autoComplete="current-password"
    type="password"
    value={password}
    onChange={handlePasswordChange}
   />
   <FormControlLabel
    control={<Checkbox value="remember" color="primary" />}
    label="Remember me"
   />
   <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    className={classes.submit}
    id="submit"
    value="Submit"
   >
    Sign In
   </Button>
  </form>
 );
};
export default LoginForm;
