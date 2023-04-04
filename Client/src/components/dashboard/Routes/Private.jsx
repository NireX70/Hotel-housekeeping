import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../layouts/loader/Loader";
import Login from "../../Login/Login";
import Dashboard from "../../../Pages/Dashboard";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const authCheck = async () => {
    const res = await axios.get("http://localhost:5000/user-auth", {
      headers: { Authorization: "Bearer " + token },
    });

    if (res.data.ok) {
      return history.replacr("/dashboard/home");
    } else {
      return <Loader />;
    }
  };
  if (token) {
    return authCheck();
  } else {
    return <Login />;
  }
}
