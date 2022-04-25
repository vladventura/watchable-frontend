import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

const routingMap = {
  "player-button": "/player",
  "remote-button": "/remote",
};

const Home = () => {
  const navigate = useNavigate();
  const socketContext = useRef(useContext(SocketContext));

  useEffect(() => {
    socketContext.current.connect();
  }, []);

  const onClick = (e) => navigate(routingMap[e.target.id]);

  return (
    <div className="simplepage-container container d-flex flex-column">
      <h1 className="simplepage-title">Watchable.</h1>
      <p>Stream YouTube videos from one device to another.</p>
      <p>What device is this?</p>
      <div className="buttons-container d-flex flex-row">
        <button
          id="player-button"
          className="primary-button round-button"
          onClick={onClick}
        >
          Player
        </button>
        <button
          id="remote-button"
          className="secondary-button round-button"
          onClick={onClick}
        >
          Remote
        </button>
      </div>
    </div>
  );
};

export { Home };
