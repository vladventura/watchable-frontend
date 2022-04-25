import YouTube from "react-youtube";
import React, { useEffect, useState, useRef, useContext } from "react";
import { VideoContext } from "../context/videoContext";

const VideoPlayer = ({ allVideos, onVideoEnd }) => {
  const [currentVideo, setCurrentVideo] = useState({});
  const {
    loadedVideoState,
    playingVideoState,
    pauseVideo,
    setPlayerRef,
  } = useContext(VideoContext);
  let playerRef = useRef();

  useEffect(() => {
    if (allVideos.length && !currentVideo.id) {
      setCurrentVideo(allVideos[0]);
    }
  }, [allVideos, currentVideo]);

  const onPlayerReady = (e) => {
    console.log(e.target);
    playerRef.current = e.target;
    console.log(playerRef);
    setPlayerRef(e.target);
  };

  // eslint-disable-next-line
  const onClickPause = (e) => {
    console.log(playerRef);
  };

  const onPlayerEnd = (e) => {
    console.log("Video ended");
    onVideoEnd();
  };

  const onPlayerStateChange = (e) => {
    // So far, 3 == loaded, 2 == pause, 1 == play
    const status = e.target.getPlayerState();
    console.log("Player status ", status);
    switch (status) {
      case 3:
        loadedVideoState(3);
        break;
      case 2:
        pauseVideo(2);
        break;
      case 1:
        playingVideoState(1);
        break;
      default:
        break;
    }
  };

  const playerOptions = {
    height: "390",
    width: "720",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div style={{}}>
      {allVideos[0]?.id ? (
        <>
          <YouTube
            videoId={allVideos[0].id}
            opts={playerOptions}
            onReady={onPlayerReady}
            onEnd={onPlayerEnd}
            onStateChange={onPlayerStateChange}
          />
          <h2>Now Playing</h2>
          <p>{allVideos[0].title}</p>
        </>
      ) : (
        "No Videos"
      )}
    </div>
  );
};

export { VideoPlayer };
