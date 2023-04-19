import { Col, Row } from "reactstrap";
import SalesChart from "../component/SalesChart";
import Feeds from "../component/Feeds";
import ProjectTables from "../component/ProjectTable";
import TopCards from "../component/TopCards";
import axios from "axios";
import { useEffect, useState } from "react";

const Starter = () => {
  const [totalCheckin, setTotalCheckIn] = useState();
  useEffect(() => {
    const fetchTotalCheckIn = async () => {
      try {
        const response = await axios.get("http://localhost:5000/guests", {
          headers: { "content-type": "application/json" },
        });
        if (response.data) {
          setTotalCheckIn(response.data.count);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTotalCheckIn();
  }, []);
  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Yearly Earning"
            earning="21k"
            icon="bi bi-wallet"
          />
        </Col>

        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Check In"
            subtitle="Number of CheckIn"
            earning={totalCheckin}
            icon=" bi bi-bag-check"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-info text-into"
            title="Check Out"
            subtitle="Number of CheckOut"
            earning="6"
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col xxl="12">
          <SalesChart />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="7" xxl="8" md="12">
          <ProjectTables />
        </Col>
        <Col md="12" lg="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
