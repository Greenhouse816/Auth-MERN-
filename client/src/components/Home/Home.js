import React from "react";
import { Container, Grow, Paper, Typography } from "@mui/material";
import decode from "jwt-decode";
import { styles } from "./styles";

const Home = () => {
  //StyleSheet

  const user = localStorage.getItem("profile")
    ? decode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const isSingedIn = user;
  // {/* Website Main Page Here  */}
  return (
    // Grow For Animation
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          {isSingedIn !== "null" && isSingedIn !== null ? (
            <Typography variant="h4" align="center" color="primary">
              You Can See This If You Are Loged In .
            </Typography>
          ) : (
            <Typography variant="h4" align="center" color="primary">
              You Can See This If You Are Not Loged In .
            </Typography>
          )}
        </Paper>
      </Container>
    </Grow>
  );
};

export default Home;
