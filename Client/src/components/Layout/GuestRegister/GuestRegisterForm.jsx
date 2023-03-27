import React, { useRef } from "react";
import InputField from "../Layout/InputField";

export default function GuestRegisterForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const numberofPeopleRef = useRef();
  const roomNumberRef = useRef();
  const amountDepositRef = useRef();
  const checkInDateRef = useRef();

  const submitHandeller = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;
    const roomNumber = roomNumberRef.current.value;
    const amountDeposit = amountDepositRef.current.value;
    const checkInDate = checkInDateRef.current.value;
    const numberofPeople = numberofPeopleRef.current.value;

    const payload = {
      email,
      name,
      address,
      phone,
      roomNumber,
      amountDeposit: +amountDeposit,
      checkInDate,
      numberofPeople: +numberofPeople,
    };
    console.log(payload);
    const response = await fetch("http://localhost:5000/guest-register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log(result);
  };
  return (
    <div>
      <form style={{ display: "grid" }} onSubmit={submitHandeller}>
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
        <InputField
          name="roomNumber"
          title="Room Number"
          refer={roomNumberRef}
        />
        <InputField
          name="checkInDate"
          title="Check In Date"
          refer={checkInDateRef}
        />

        <button>Signup</button>
      </form>
    </div>
  );
}
