import React from "react";
import { Route } from "react-router-dom";
import Signup from "./Components/Layout/Signup/Signup";
import LoginPage from "./Pages/LoginPage";
const Routes = () => {
  return (
    <>
      <Route path="/signup" Component={Signup} />
      <Route path="/login" Component={LoginPage} />
    </>
  );
};

export default Routes;
