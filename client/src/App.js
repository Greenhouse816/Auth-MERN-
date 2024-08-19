import React from "react";
import { Container } from "@mui/material";
//Routing
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import PasswordSetting from "./components/PasswordSettings/PasswordSettings";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/auth" element={<Login />} />
          <Route exact path="/password" element={<PasswordSetting />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
