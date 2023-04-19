import React, { Fragment, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RoomCards = (props) => {
  const [visible, setVisible] = useState(false);
  const [lodgingVisible, setLodgingVisible] = useState(false);
  let allTotal = 0;

  const downloadHandler = async () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const tableY = pageHeight * 0.2; // 20% of page height
    doc.setFontSize(18);
    doc.text(`Hotel New Basuki`, 75, 9);
    doc.setFontSize(14);
    doc.text(`Name: ${props.detail.guest.name}`, 14, 20);
    doc.setFontSize(14);

    // Add room number and amount deposited
    doc.text(`Room Number: ${props.detail.room.roomNumber}`, 14, 30);
    doc.text(`Amount Deposited: ${props.detail.guest.amountDeposit}`, 14, 40);

    // Add table to PDF
    const tableOptions = {
      head: [["Date", "Item", "Price", "Quantity", "Total"]],
      body: props.detail.guest.account.map((bill) => {
        const date = new Date(bill.date);
        const options = {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        };
        let formattedDate = date.toLocaleString("en-US", options);
        return [
          formattedDate,
          bill.item,
          bill.price,
          bill.quantity,
          bill.total,
        ];
      }),
      startY: tableY,
    };
    doc.autoTable(tableOptions);

    // Add total and remaining amount to PDF
    const allTotal = props.detail.guest.account.reduce(
      (total, bill) => total + +bill.total,
      0
    );
    const remainingAmount = allTotal - props.detail.guest.amountDeposit;
    doc.text(`Total Amount: ${allTotal}`, 14, 160);
    doc.text(`Amount To Return: ${remainingAmount}`, 14, 170);

    // Save PDF
    doc.save("bill.pdf");
  };

  const checkOutHandler = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/roomCheckout/${props.detail.guest._id}`
      );
      props.onReload();
      const task = await axios.post(
        `http://localhost:5000/task?room=${props.detail.room.roomNumber}`
      );
      console.log(task);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-around">
          <h1 className="  flex items-center justify-center mb-2  font-bold tracking-tight text-gray-800">
            {props.detail.room.roomNumber}
          </h1>
          {props.detail.guest ? (
            <h3>
              <i className="pi pi-check text-green"></i>
            </h3>
          ) : (
            <></>
          )}
        </div>

        <p className=" flex items-center justify-center mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.detail.room.roomType}
        </p>

        <Button
          className="border-x-amber-950"
          label="View Details"
          onClick={() => setVisible(true)}
        />
        {props.detail.guest ? (
          <Fragment>
            <Dialog
              className={"bg-gray-700 text-white rounded-md p-3 "}
              // className={classes.bacdrop}
              header={props.detail.room.roomNumber}
              visible={visible}
              style={{
                width: "50vw",
              }}
              onHide={() => setVisible(false)}
            >
              <p className=" flex flex-row  justify-between m-0 text-white">
                {props.detail.guest.name}
                <Button
                  onClick={checkOutHandler}
                  className="bg-red-500  hover:bg-red-700 font-bold py-2 px-4 rounded"
                  label="CheckOut"
                />
              </p>
              <hr />
              <p>Email : {props.detail.guest.email}</p>
              <p>Address : {props.detail.guest.address}</p>
              <p>Phone : {props.detail.guest.phone}</p>
              <p>Number of People : {props.detail.guest.numberofPeople}</p>
              <p>Room No : {props.detail.room.roomNumber}</p>
              <p>
                CheckIn Date :
                {new Date(props.detail.guest.checkInDate).toLocaleString(
                  "en-US",
                  {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                  }
                )}
              </p>
              <p>Amount Deposite : {props.detail.guest.amountDeposit}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setLodgingVisible(true)}
              >
                View Lodging Details
              </button>
            </Dialog>
            <Dialog
              className="bg-gray-700 border border-white-500 text-white rounded-md p-3 w-2"
              header={props.detail.room.roomNumber}
              visible={lodgingVisible}
              style={{ width: "70vw" }}
              onHide={() => setLodgingVisible(false)}
            >
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-3 "
                  onClick={downloadHandler}
                >
                  Download PDF
                </button>
              </div>

              <div className=" flex justify-center mx-5 gap-3 text-white">
                <table className=" border-collapse border-spacing-4">
                  <thead className="">
                    <tr>
                      <th className="border p-4">Date</th>
                      <th className="border p-4">Item</th>
                      <th className="border p-4">Price</th>
                      <th className="border p-4">Quantity</th>
                      <th className="border p-4">Total</th>
                    </tr>
                  </thead>

                  {props.detail.guest.account.map((bill) => {
                    const date = new Date(bill.date);
                    const options = {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit",
                    };
                    let formattedDate = date.toLocaleString("en-US", options);
                    allTotal = +allTotal + +bill.total;

                    return (
                      <tbody>
                        <tr key={bill._id}>
                          <td className="border p-4">{formattedDate}</td>
                          <td className="border p-4">{bill.item}</td>
                          <td className="border p-4">{bill.price}</td>
                          <td className="border p-4">{bill.quantity}</td>
                          <td className="border p-4">{bill.total}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
              <label htmlFor="Total Amount"> Total Amount</label>
              <p className="flex float-right w-100">{allTotal}</p>
              <p>Amount deposite ={props.detail.guest.amountDeposit}</p>
              <label htmlFor="Remaining Amount"> Remaining Amount</label>

              <p className="flex float-right w-100">
                {+allTotal - +props.detail.guest.amountDeposit}
              </p>
            </Dialog>
          </Fragment>
        ) : (
          <Dialog
            className="bg-black text-white rounded-md p-3"
            header={props.detail.room.roomNumber}
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
          >
            <p className=" flex justify-center m-0 text-white">
              Room is vacant
            </p>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default RoomCards;
