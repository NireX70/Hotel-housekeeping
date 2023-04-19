import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Room from "./Pages/Room.jsx";
import Starter from "./components/dashboard/views/Starter";
import GuestRegister from "./components/GuestRegister/GuestRegister";
import Notification from "./Pages/Notification";
import History from "./Pages/History.jsx";
import GuestBill from "./Pages/GuestBill";
import GuestSignup from "./components/Signup/GuestSignup";
import GuestLogin from "./components/Login/GuestLogin";
import GuestDashboard from "./components/GuestDashboard/GuestDashboard";
import About from "./components/dashboard/views/About";

const App = () => {
  return (
    <Routes>
      <Route path="/" exact Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/signupguest" Component={GuestSignup} />
      <Route path="/loginguest" Component={GuestLogin} />
      <Route path="/dashboard" Component={Dashboard}>
        <Route path="/dashboard" exact Component={Starter} />
        <Route path="/dashboard/about" exact Component={About} />
        <Route
          path="/dashboard/guestregister"
          exact
          Component={GuestRegister}
        />
        <Route path="/dashboard/room" exact Component={Room} />
        <Route path="/dashboard/notifications" exact Component={Notification} />
        <Route path="/dashboard/guestbill" exact Component={GuestBill} />
        <Route path="/dashboard/history" exact Component={History} />
      </Route>

      <Route path="/dashboardguest" Component={GuestDashboard}>
        <Route path="/dashboardguest" exact Component={About} />
        <Route
          path="/dashboardguest/guestregister"
          exact
          Component={GuestRegister}
        />
        <Route
          path="/dashboardguest/notifications"
          exact
          Component={Notification}
        />
        \
      </Route>
    </Routes>
  );
};

export default App;
