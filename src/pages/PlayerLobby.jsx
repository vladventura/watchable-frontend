import "./PlayerLobby.css";
import React, { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

const PlayerLobby = () => {
  const navigate = useNavigate();
  const socketContext = useRef(useContext(SocketContext));

  useEffect(() => {
    socketContext.current.socketioClient.on("room-created", (roomInfo) => {
      // We re-route here
      socketContext.current.setRoomInfo(roomInfo);
      navigate({
        pathname: `/player/${roomInfo.id}`,
        state: roomInfo,
      });
    });
    socketContext.current.socketioClient.emit("create-room");
  }, [navigate]);

  return (
    <div className="lobby-container container d-flex flex-column">
      <h1>Creating room...</h1>
      <p>Please sit tight! We're preparing a room just for you!</p>
    </div>
  );
};

export { PlayerLobby };
