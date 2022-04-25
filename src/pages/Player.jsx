import "./Player.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { VideoPlayer } from "../components/VideoPlayer";
import { MediaButtons } from "../components/MediaButtons";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

const Player = () => {
  const [videos, setVideos] = useState([]);
  const socketContext = useRef(useContext(SocketContext));
  const { socketioClient } = socketContext.current;
  const location = useLocation();
  const roomInfo = location.state;

  useEffect(() => {
    socketioClient.on("get-videos", (incomingVideos) => {
      setVideos(incomingVideos);
    });
    socketioClient.on("new-video-added", (incomingVideos) => {
      console.log("New video added", incomingVideos);
      setVideos(incomingVideos);
    });
  }, [socketioClient]);

  const onVideoEnd = () => {
    setVideos(videos.slice(1));
    socketioClient.emit("finished-current-video");
  };

  return (
    <div className="App">
      <div className="main-page">
        <p>{roomInfo.reducedId}</p>
        <VideoPlayer
          className="video-player"
          allVideos={videos}
          onVideoEnd={onVideoEnd}
        />
        <ul className="up-next-list">
          <h2 className="up-next-title">Up Next</h2>
          {videos?.length - 1 > 0 ? (
            videos.slice(1).map((video) => (
              <li className="up-next-item" key={video.id}>
                {video.title} - {video.channelTitle}
              </li>
            ))
          ) : (
            <p>Nothing to show here</p>
          )}
        </ul>
      </div>
      <MediaButtons />
    </div>
  );
};

export { Player };
