import React, { useRef, useState } from "react";
import InputField from "../Layout/InputField";
import { Button } from "reactstrap";

import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import axios from "axios";

const GuestRegister = () => {
  const roomNumbers = [
    "200",
    "201",
    "202",
    "203",
    "204",
    "205",
    "206",
    "207",
    "208",
  ];
  const [selectedRoom, setSelectedRoom] = useState(roomNumbers[0]);
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const numberofPeopleRef = useRef();
  const amountDepositRef = useRef();
  const checkInDateRef = useRef();
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const navigate = useNavigate();

  const submitHandeller = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;
    const roomNumber = selectedRoom;
    const amountDeposit = amountDepositRef.current.value;
    const checkInDate = fromDate;
    const checkOutDate = toDate;
    const numberofPeople = numberofPeopleRef.current.value;

    const payload = {
      email,
      name,
      address,
      phone,
      roomNumber,
      amountDeposit: +amountDeposit,
      checkInDate,
      checkOutDate,
      numberofPeople: +numberofPeople,
    };
    console.log(payload);

    const registerGuest = async (payload) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/guest-register",
          payload
        );
        console.log(response);

        alert("sucessfully registered");
        navigate("/dashboard/room");
      } catch (err) {
        console.log(err);
      }
    };
    registerGuest(payload);
  };
  return (
    <div>
      <form
        className=" grid-cols-2 gap-4"
        style={{ display: "grid" }}
        onSubmit={submitHandeller}
      >
        <InputField name="name" title="Name" refer={nameRef} />
        <InputField name="email" title="Email" refer={emailRef} />
        <InputField name="phone" title="Phone" refer={phoneRef} />
        <InputField name="address" title="Address" refer={addressRef} />
        <InputField
          name="amountDeposit"
          title="Amount Deposit"
          refer={amountDepositRef}
        />
        <InputField
          name="numberofPeople"
          title="Number of People"
          refer={numberofPeopleRef}
        />
        <div>
          <p>Room Number</p>
          <Dropdown
            className="border-2 border-gray-700 rounded-md py-2 px-4 bg-gray-100 text-black hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.value)}
            options={roomNumbers}
            placeholder="Select a Room"
          />
        </div>
        <div className="flex ">
          <div>
            <div className="field  md:col-6">
              <label htmlFor="fromDate">CheckIn Date</label>
              <Calendar
                id="fromDate"
                value={fromDate}
                refer={checkInDateRef}
                onChange={(e) => setFromDate(e.value)}
                showIcon
              />
            </div>
          </div>
          <div></div>
          <div className="field  md:col-6">
            <label htmlFor="toDate">CheckOut Date</label>
            <Calendar
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.value)}
              showIcon
            />
          </div>
        </div>

        <Button className="mt-5">Register</Button>
      </form>
    </div>
  );
};

export default GuestRegister;
