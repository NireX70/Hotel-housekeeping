import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Guest Registration",
    href: "/dashboard/guestregister",
    icon: "bi bi-patch-check",
  },
  {
    title: "Rooms",
    href: "/dashboard/room",
    icon: "bi bi-patch-check",
  },

  {
    title: "Chats",
    href: "/dashboard/notifications",
    icon: "bi bi-bell",
  },
  {
    title: "Guest  Bill Entry",
    href: "/dashboard/guestbill",
    icon: "bi bi-bell",
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: "bi bi-clock-history",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <span class="text-gray-700 text-3xl font-bold">
          Hotel New Basuki <hr />
        </span>
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
