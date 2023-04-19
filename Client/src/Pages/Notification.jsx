import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const Notification = () => {
  const [chats, setChats] = useState();
  const fetchChats = async () => {
    const data = await axios.get("http://localhost:5000/chats");
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <Fragment>
      <div>
        {chats.map((chat) => (
          <div key={chat._id}>{chat.chatName}</div>
        ))}
      </div>
      );
    </Fragment>
  );
};

export default Notification;
