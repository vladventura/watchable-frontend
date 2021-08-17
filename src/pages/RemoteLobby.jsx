import "./RemoteLobby.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
const socketioClient = io("http://192.168.1.152:4000");

const RemoteLobby = () => {
  const [roomId, setRoomId] = useState("");
  const [error, showError] = useState("");
  const history = useHistory();
  useEffect(() => {
    socketioClient.on("room-not-found", () => {
      console.log("Sadness");
      showError("Room not found");
    });

    socketioClient.on("joined-success", (roomInfo) => {
      history.push({
        pathname: `/remote/${roomInfo.id}`,
        state: roomInfo,
      });
    });

    return () => {
      socketioClient.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (roomId) socketioClient.emit("join-room", roomId);
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
