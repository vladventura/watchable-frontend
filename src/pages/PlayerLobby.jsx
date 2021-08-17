import "./PlayerLobby.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

const socketioClient = io("http://192.168.1.152:4000");

const PlayerLobby = () => {
  const history = useHistory();
  useEffect(() => {
    socketioClient.on("room-created", (roomInfo) => {
      history.push({
        pathname: `/player/${roomInfo.id}`,
        state: roomInfo,
      });
    });
    socketioClient.emit("create-room");
  }, [history]);

  return (
    <div className="lobby-container container d-flex flex-column">
      <h1>Creating room...</h1>
      <p>Please sit tight! We're preparing a room just for you!</p>
    </div>
  );
};

export { PlayerLobby };
