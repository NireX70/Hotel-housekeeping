import React, { useState, useEffect } from "react";
import axios from "axios";

const Notification = () => {
  const [guests, setGuests] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/registered-guest"
        );
        setGuests(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/roomDetails", {
          headers: { "Content-Type": "application/json" },
        });
        console.log("hi", response.data);
        setRoomDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log("fasdfads", roomDetails);
  }, []);

  return (
    <div>
      <h2>Total Guest Till the Date</h2>

      <ul className="grid grid-cols-4 gap-4">
        {guests.map((guest) => (
          <li className="" key={guest._id}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg mt-4">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{guest.name} -</div>
              </div>
              <div className="px-6  pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {guest.email}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {guest.phone}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
