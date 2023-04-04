import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Starter from "./components/dashboard/views/Starter";

const App = () => {
  return (
    <Routes>
      <Route path="/" exact Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/dashboard" Component={Dashboard}>
        <Route path="/dashboard" exact Component={Starter} />
      </Route>
    </Routes>
  );
};

export default App;
