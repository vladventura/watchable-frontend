import "./MediaButtons.css";
import React, { useContext } from "react";
import { VideoContext } from "../context/videoContext";

const MediaButtons = ({
  customFns = {
    playFromStart: null,
    goBackFive: null,
    onMiddleClick: null,
    goForwardsFive: null,
    skipToNext: null,
  },
  playState,
}) => {
  const {
    playerStatus,
    playFromStart,
    goBackFive,
    playVideo,
    pauseVideo,
    goForwardsFive,
    skipToNext,
  } = useContext(VideoContext);

  const onPlayFromStart = () => {
    if (customFns.playFromStart) {
      customFns.playFromStart();
    } else {
      playFromStart();
    }
  };

  const onGoBackFive = () => {
    if (customFns.goBackFive) {
      customFns.goBackFive();
    } else {
      goBackFive();
    }
  };

  const onMiddleClick = () => {
    if (customFns.onMiddleClick) {
      customFns.onMiddleClick();
    } else {
      if (playerStatus === 1) {
        pauseVideo();
      } else {
        playVideo();
      }
    }
  };

  const onGoForwardsFive = () => {
    if (customFns.goForwardsFive) {
      customFns.goForwardsFive();
    } else {
      goForwardsFive();
    }
  };

  const onSkipNext = () => {
    if (customFns.skipToNext) {
      customFns.skipToNext();
    } else {
      skipToNext();
    }
  };

  const playerState = playState ? playState : playerStatus;

  return (
    <div className="media-buttons">
      <button className="media-button backward" onClick={onPlayFromStart}>
        <i className="fas fa-fast-backward"></i>
      </button>
      <button className="media-button play" onClick={onGoBackFive}>
        <i className="fas fa-backward"></i>
      </button>
      <button className="media-button play" onClick={onMiddleClick}>
        <i className={`fas fa-${playerState === 1 ? "pause" : "play"}`}></i>
      </button>
      <button className="media-button play" onClick={onGoForwardsFive}>
        <i className="fas fa-forward"></i>
      </button>
      <button className="media-button forward" onClick={onSkipNext}>
        <i className="fas fa-fast-forward"></i>
      </button>
    </div>
  );
};
export { MediaButtons };
