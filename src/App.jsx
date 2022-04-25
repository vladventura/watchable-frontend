import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VideoProvider } from "./context/videoContext";
import { Home, Player, PlayerLobby, Remote } from "./pages";
import { RemoteLobby } from "./pages/RemoteLobby";
import { SocketProvider } from "./context/socketContext";

export const App = () => {
  return (
    <>
      <SocketProvider>
        <VideoProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/player" exact element={<PlayerLobby />} />
              <Route path="/player/:roomId" exact element={<Player />} />
              <Route path="/remote" exact element={<RemoteLobby />} />
              <Route path="/remote/:roomId" exact element={<Remote />} />
            </Routes>
          </BrowserRouter>
        </VideoProvider>
      </SocketProvider>
    </>
  );
};
