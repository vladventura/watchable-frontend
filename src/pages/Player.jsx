import "./Player.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { VideoPlayer } from "../components/VideoPlayer";
import { MediaButtons } from "../components/MediaButtons";
import { useHistory } from "react-router-dom";

const socketioClient = io("http://192.168.1.152:4000");

const Player = () => {
  const [videos, setVideos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    socketioClient.on("get-videos", (incomingVideos) => {
      console.log("Received all videos");
      setVideos(incomingVideos);
    });
    socketioClient.on("new-video-added", (incomingVideos) => {
      console.log("New video added", incomingVideos);
      setVideos(incomingVideos);
    });
    return () => {
      socketioClient.disconnect();
    };
  }, []);

  const onVideoEnd = () => {
    setVideos(videos.slice(1));
    socketioClient.emit("finished-current-video");
  };

  return (
    <div className="App">
      <div className="main-page">
        <p>{history.location.state.reducedId}</p>
        <VideoPlayer
          className="video-player"
          allVideos={videos}
          onVideoEnd={onVideoEnd}
        />
        <ul style={{ justifySelf: "center" }}>
          <h2>Up Next</h2>
          {videos.length - 1 > 0 ? (
            videos.slice(1).map((video) => (
              <li key={video.id} style={{ fontSize: "1rem" }}>
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
