import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const ProjectTables = () => {
  const [currentGuests, setCurrentGuests] = useState([]);

  useEffect(() => {
    const fetchCurrentGuests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/latestguests", {
          headers: { "content-type": "application/json" },
        });
        if (response.data) {
          setCurrentGuests(response.data.details);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentGuests();
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Latest CheckIn</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Customer flow
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Room</th>

                <th>Check In Date</th>
                <th>Deposit Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentGuests.map((guest) => (
                <tr key={guest._id} className="border-top">
                  <td>
                    <div className="ms-3">
                      <h6 className="mb-0">{guest.name}</h6>
                      <span className="text-muted">{guest.email}</span>
                    </div>
                  </td>
                  <td>{guest.roomId ? guest.roomId.roomNumber : ""}</td>
                  <td>
                    {new Date(guest.checkInDate).toLocaleString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit",
                    })}
                  </td>
                  <td>{guest.amountDeposit}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;

// <td>
//   {tdata.status === "pending" ? (
//     <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
//   ) : tdata.status === "holt" ? (
//     <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
//   ) : (
//     <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
//   )}
// </td>;
