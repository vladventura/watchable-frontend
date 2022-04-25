import "./RemoteLobby.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

const RemoteLobby = () => {
  const socketContext = useRef(useContext(SocketContext));
  const [roomId, setRoomId] = useState("");
  const [error, showError] = useState("");
  const history = useHistory();
  useEffect(() => {
    socketContext.current.socketioClient.on("room-not-found", () => {
      console.log("Sadness");
      showError("Room not found");
    });

    socketContext.current.socketioClient.on("joined-success", (roomInfo) => {
      history.push({
        pathname: `/remote/${roomInfo.id}`,
        state: roomInfo,
      });
    });
  }, [history]);

  const joinRoom = () => {
    if (roomId) socketContext.current.socketioClient.emit("join-room", roomId);
  };

  return (
    <div className="simplepage-container container d-flex flex-column">
      <h1 className="simplepage-title">Join Room.</h1>
      <p>Type the code of the room that you'd like to join.</p>
      <input
        className="join-input"
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      {error ? <p>{error}</p> : null}
      <button
        id="join-room-button"
        className="remote-button round-button"
        onClick={joinRoom}
      >
        Join room
      </button>
    </div>
  );
};

export { RemoteLobby };
