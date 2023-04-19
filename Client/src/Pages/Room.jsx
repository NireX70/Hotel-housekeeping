import React, { useState, useEffect } from "react";
import RoomCards from "../components/Layout/RoomCards";
import axios from "axios";

const Room = (props) => {
  const [roomDetails, setRoomDetails] = useState([]);
  const [reload, setReload] = useState(false);

  const pageReloadHandler = () => {
    setReload((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/roomDetails", {
          headers: { "Content-Type": "application/json" },
        });
        if (response.data) {
          setRoomDetails(response.data.details);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [reload]);

  //
  return (
    <>
      <ul className="grid grid-cols-4 gap-4">
        {roomDetails.map((roomDetail) => (
          <RoomCards
            key={roomDetail.room._id}
            type={roomDetail.room.roomType}
            detail={roomDetail}
            onReload={pageReloadHandler}
          />
        ))}
      </ul>
    </>
  );
};

export default Room;
