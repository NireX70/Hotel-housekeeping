import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../../store/context";
import { useDispatch } from "react-redux";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../../../assets/images/logos/xtremelogowhite.svg";
import user1 from "../../../assets/images/users/user1.jpg";

const Header = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    sessionStorage.removeItem("token");
    dispatch(authActions.restore());
    navigate("/");
  };
  return (
    <Navbar color="dark" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand>
        <Button
          color="dark"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="dark"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/dashboard" className="nav-link">
              Starter
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/dashboard/about" className="nav-link">
              About
            </Link>
          </NavItem>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="dark">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem href="/" onClick={onLogoutHandler}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Header;
