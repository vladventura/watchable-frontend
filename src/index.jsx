import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { VideoProvider } from "./context/videoContext";
import { Home, Player, PlayerLobby, Remote } from "./pages";
import { RemoteLobby } from "./pages/RemoteLobby";
import { SocketProvider } from "./context/socketContext";

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <VideoProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/player" exact component={PlayerLobby} />
            <Route path="/player/:roomId" exact component={Player} />
            <Route path="/remote" exact component={RemoteLobby} />
            <Route path="/remote/:roomId" exact component={Remote} />
          </Switch>
        </Router>
      </VideoProvider>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
