//React Hooks
import React, { useState, useEffect } from "react";

//Design Elements
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";

//Routing
import { Link, useNavigate, useLocation } from "react-router-dom";
//Redux ...
import { useDispatch } from "react-redux";

//Decoding The Token To Logout User After Token Expired
import decode from "jwt-decode";

//Importing Constants
import * as actionType from "../../constants/actionTypes";

//StyleSheet
import { styles } from "./styles";

const Navbar = () => {
  //Get User Data From LocalStorage
  const [user, setUser] = useState(
    localStorage.getItem("profile")
      ? decode(JSON.parse(localStorage.getItem("profile")).token)
      : "null"
  );
  //Dispatch For Redux
  const dispatch = useDispatch();
  //For Route Changes
  let location = useLocation(); //Routing
  const history = useNavigate();
  //StyleSheet

  //Logout Logics
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history("/auth");
    setUser("null");
  };
  //Checking If User Token Is Expired And Log The User Out (On Route Change)
  useEffect(() => {
    if (user !== "null" && user !== null) {
      // *1000 To Convert Second To Milisecond
      if (user.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(
      localStorage.getItem("profile")
        ? decode(JSON.parse(localStorage.getItem("profile")).token)
        : "null"
    );
  }, [location]);
  //Navbar JSXs
  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div sx={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="h5"
          align="center"
        >
          WebSite
        </Typography>
      </div>
      <Toolbar sx={styles.toolbar}>
        {/* Check If User Is Loged In */}
        {user !== "null" && user !== null ? (
          <div sx={styles.profile}>
            <Avatar sx={styles.purple} alt={user.name} src={user.picture}>
              {/* Show First Letter Of User Name */}
              {user.name.charAt(0)}
            </Avatar>
            {/* User Name */}
            <Typography sx={styles.userName} variant="h6">
              {user.name}
            </Typography>
            {/* LogOut Button */}
            <Button
              variant="contained"
              sx={styles.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                history("/password");
              }}
            >
              Password Setting
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
