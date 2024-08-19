//React Hooks
import React, { useState } from "react";

//Design Elements
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Input from "./Input";

//Google Login
import { GoogleLogin } from "@leecheuk/react-google-login";

//Jwt Decoder
import decode from "jwt-decode";

//Redux Dispatch ( I HATE REDUX !!! 😭)
import { useDispatch } from "react-redux";

//React Router For Pushing To Main Route After Login
import { useNavigate } from "react-router-dom";

//Actions
import { signup, signin, googleLogin } from "../../actions/login";

//Icons
import LockIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "./googleIcon";

//StyleSheet
import { styles } from "./styles";
//toast message
import * as messages from "../../messages";
//Form Data Initial Value
const formDataInitVal = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
//Google Client ID
const GOOGLE_CLIENT_ID = "GOOGLE CLIENT ID HERE";

const Login = () => {
  //States
  const [formData, setFormData] = useState(formDataInitVal);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [isSignIn, setIsSignIn] = useState(true);
  const user = localStorage.getItem("profile")
    ? decode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";

  const dispatch = useDispatch();
  const history = useNavigate();

  //// Handle Actions
  //Form Submit
  const handleSubmit = (e) => {
    //Prevent Page Refresh
    e.preventDefault();
    if (isSignIn) {
      dispatch(signin(formData, history));
    } else {
      if (passwordScore < 3) {
        messages.error("Password Is Weak !");
      } else {
        dispatch(signup(formData, history));
      }
    }
  };

  //Form Elements Value Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //Show Password Button
  const handleShowPassword = (e) => {
    setShowPassword((prevPassword) => !prevPassword);
  };
  //password weakness
  const onChangeScore = (score, feedback) => {
    setPasswordScore(score);
  };
  //Switch Sign In/Up Button
  const switchSignIn = (e) => {
    setIsSignIn((prevState) => !prevState);
  };
  //Google Login Events
  const googleSuccess = async (res) => {
    dispatch(googleLogin(res, history));
  };

  const googleFailure = () => {
    messages.error("Google sign in was unsuccessful !");
  };
  if (user !== "null" && user !== null) {
    history("/");
    return null;
  } else {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <Paper sx={styles.paper} elevation={3}>
            <Avatar sx={styles.avatar}>
              {" "}
              <LockIcon />
            </Avatar>
            <Typography variant="h5" color="primary">
              {isSignIn ? "Sign In" : "Sign Up"}
            </Typography>
            <form sx={styles.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Only Show If It Wasn't Sign In */}
                {!isSignIn && (
                  <>
                    <Input
                      name="firstName"
                      label="First Name"
                      handleChange={handleChange}
                      autoFocus
                      half
                    />
                    <Input
                      name="lastName"
                      label="Last Name"
                      handleChange={handleChange}
                      half
                    />
                  </>
                )}

                <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  type="email"
                />
                <Input
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                  half={isSignIn ? false : true}
                  showBar={isSignIn ? false : true}
                  passValue={formData.password}
                  barClass={styles.passBar}
                  onChangeScore={onChangeScore}
                />
                {/* Only Show If It Wasn't Sign In */}
                {!isSignIn && (
                  <>
                    <Input
                      name="confirmPassword"
                      label="Confirm Password"
                      handleChange={handleChange}
                      type="password"
                      half
                    />
                  </>
                )}
              </Grid>
              <Button
                type="submit"
                sx={styles.submit}
                fullWidth
                variant="contained"
                color="primary"
              >
                {/* Change Text Based On Sign In/Up */}
                {isSignIn ? "Sign In" : "Sign Up"}
              </Button>
              {/* Google Login */}
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                render={(renderProps) => (
                  <Button
                    sx={styles.googleButton}
                    color="primary"
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<GoogleIcon />}
                    variant="contained"
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={switchSignIn}>
                    {isSignIn
                      ? "Dont Have An Account ? Sign Up ."
                      : "Already Have An Account ? Sign In ."}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    );
  }
};

export default Login;
