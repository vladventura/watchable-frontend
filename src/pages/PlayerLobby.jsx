import "./PlayerLobby.css";
import { useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

const PlayerLobby = () => {
  const history = useHistory();
  const socketContext = useRef(useContext(SocketContext));

  useEffect(() => {
    socketContext.current.socketioClient.on("room-created", (roomInfo) => {
      // We re-route here
      socketContext.current.setRoomInfo(roomInfo);
      history.push({
        pathname: `/player/${roomInfo.id}`,
        state: roomInfo,
      });
    });
    socketContext.current.socketioClient.emit("create-room");
  }, [history]);

  return (
    <div className="lobby-container container d-flex flex-column">
      <h1>Creating room...</h1>
      <p>Please sit tight! We're preparing a room just for you!</p>
    </div>
  );
};

export { PlayerLobby };
