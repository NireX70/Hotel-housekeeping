import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/test" component={Test} />
      <Route path="/dashboard" component={Dashboard} />
    </Routes>
  );
};

export default Routers;
