import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Input from "../Login/Input";
import { styles } from "./styles";
import LockIcon from "@mui/icons-material/LockRounded";
import { setPassword, changePassword } from "../../actions/login";
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as messages from "../../messages";
const PasswordSetting = () => {
  const user = localStorage.getItem("profile")
    ? decode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const isSingedIn = user;
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [formData, setFormData] = useState({ password: "", email: user.email });
  const [changeFormData, setChangeFormData] = useState({
    oldPassword: "",
    newPassword: "",
    email: user.email,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeC = (e) => {
    setChangeFormData({ ...changeFormData, [e.target.name]: e.target.value });
  };
  const onChangeScore = (score, feedback) => {
    setPasswordScore(score);
  };
  const handleShowPassword = (e) => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const handleSubmitSet = (e) => {
    e.preventDefault();
    if (passwordScore < 3) {
      messages.error("Password Is Weak !");
    } else {
      dispatch(setPassword(formData, history));
    }
  };
  const handleSubmitChange = (e) => {
    e.preventDefault();
    if (passwordScore < 3) {
      messages.error("New Password Is Weak !");
    } else {
      dispatch(changePassword(changeFormData, history));
    }
  };
  useEffect(() => {
    if (isSingedIn == "null" || isSingedIn == null) {
      history("/");
    }
  }, []);
  if (isSingedIn !== "null" && isSingedIn !== null) {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <Paper sx={styles.paper} elevation={3}>
            <Avatar sx={styles.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="h5" color="primary">
              Password Setting
            </Typography>
            {user.password.startsWith("NONE") ? (
              <form sx={styles.form} onSubmit={handleSubmitSet}>
                <Grid container spacing={2}>
                  <Typography variant="caption" color="error" sx={styles.typo}>
                    You Are Using Google For Login , In Order To Access Normal
                    Login You Have To Choose A Password .
                  </Typography>
                  <Input
                    name="password"
                    label="Password"
                    handleChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                    showBar={true}
                    passValue={formData.password}
                    barClass={styles.passBar}
                    onChangeScore={onChangeScore}
                  />
                  <Button
                    type="submit"
                    sx={styles.submit}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit Password
                  </Button>
                </Grid>
              </form>
            ) : (
              <form sx={styles.form} onSubmit={handleSubmitChange}>
                <Grid container spacing={2}>
                  <Typography
                    variant="caption"
                    color="error"
                    sx={styles.typo}
                    align="left"
                  >
                    To Change Password , Please Enter Your Old Password And New
                    Password .
                  </Typography>
                  <Input
                    name="oldPassword"
                    label="Current Password"
                    handleChange={handleChangeC}
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                  />
                  <Input
                    name="newPassword"
                    label="New Password"
                    handleChange={handleChangeC}
                    type="password"
                    showBar={true}
                    passValue={changeFormData.newPassword}
                    barClass={styles.passBar}
                    onChangeScore={onChangeScore}
                  />
                  <Button
                    type="submit"
                    sx={styles.submit}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Change Password
                  </Button>
                </Grid>
              </form>
            )}
          </Paper>
        </Container>
      </div>
    );
  } else {
    return <>No Access</>;
  }
};

export default PasswordSetting;
