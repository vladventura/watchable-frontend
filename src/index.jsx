import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import { VideoProvider } from "./context/videoContext";
import { AddToQueue, Home, Player, PlayerLobby } from "./pages";
import { RemoteLobby } from "./pages/RemoteLobby";
ReactDOM.render(
  <React.StrictMode>
    <VideoProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/player" exact component={PlayerLobby} />
          <Route path="/player/:roomId" component={Player} />
          <Route path="/remote" exact component={RemoteLobby} />
          <Route path="/remote/:roomId" exact component={AddToQueue} />
        </Switch>
      </Router>
    </VideoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
