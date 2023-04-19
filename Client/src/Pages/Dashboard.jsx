import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/layouts/Sidebar";
import Header from "../components/dashboard/layouts/Header";
import { Container } from "reactstrap";
import { useSelector } from "react-redux/es";
import { useNavigate } from "react-router-dom";
import useValidateToken from "../hooks/useValidateToken";
import Loader from "../components/dashboard/layouts/loader/Loader";
const Dashboard = () => {
  useValidateToken();
  const hasToken = useSelector((state) => state.auth.token);
  if (!hasToken) {
    console.log("Inside dashboard to navigate");
    return <Loader />;
  }
  return (
    <>
      <main>
        <div className="pageWrapper d-lg-flex">
          {/********Sidebar**********/}
          <aside className="sidebarArea shadow" id="sidebarArea">
            <Sidebar />
          </aside>
          {/********Content Area**********/}

          <div className="contentArea">
            {/********header**********/}
            <Header />
            {/********Middle Content**********/}
            <Container className="p-4 wrapper" fluid>
              <Outlet />
            </Container>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
