import { createContext, useReducer } from "react";

const initState = {
  playerStatus: 0,
  playerRef: null,
  playingVideoState: () => {},
  loadedVideoState: () => {},
  pausedVideoState: () => {},
  setPlayerRef: (playerRef) => {},
  playFromStart: () => {},
  goBackFive: () => {},
  goForwardsFive: () => {},
  skipToNext: () => {},
};

const VideoContext = createContext(initState);

const videoReducer = (state, action) => {
  switch (action.type) {
    case "LOADED_VIDEO_STATE":
    case "PAUSED_VIDEO_STATE":
    case "PLAYING_VIDEO_STATE":
      return {
        ...state,
        playerStatus: action.payload,
      };
    case "SET_PLAYER_REF":
      return {
        ...state,
        playerRef: action.payload,
      };
    default:
      return state;
  }
};

const VideoProvider = (props) => {
  const [state, dispatch] = useReducer(videoReducer, initState);
  const loadedVideoState = () => {
    dispatch({ type: "LOADED_VIDEO_STATE", payload: 3 });
  };
  const playingVideoState = () => {
    dispatch({ type: "PLAYING_VIDEO_STATE", payload: 1 });
  };
  const pausedVideoState = () => {
    dispatch({ type: "PAUSED_VIDEO_STATE", payload: 2 });
  };
  const setPlayerRef = (playerRef) => {
    dispatch({ type: "SET_PLAYER_REF", payload: playerRef });
  };
  const playFromStart = () => {
    if (state.playerRef) {
      state.playerRef.seekTo(0, true);
      dispatch({
        type: "PLAY_FROM_START",
      });
    }
  };
  const goBackFive = () => {
    if (state.playerRef) {
      const currentTime = state.playerRef.getCurrentTime();
      state.playerRef.seekTo(currentTime - 5, true);
      dispatch({
        type: "GO_BACK_FIVE",
      });
    }
  };
  const pauseVideo = () => {
    if (state.playerRef) {
      pausedVideoState();
      state.playerRef.pauseVideo();
    }
  };
  const playVideo = () => {
    if (state.playerRef) {
      playingVideoState();
      state.playerRef.playVideo();
    }
  };
  const goForwardsFive = () => {
    if (state.playerRef) {
      const currentTime = state.playerRef.getCurrentTime();
      state.playerRef.seekTo(currentTime + 5, true);
    }
  };
  const skipToNext = () => {
    if (state.playerRef) {
      const totalDuration = state.playerRef.getDuration();
      state.playerRef.seekTo(totalDuration, true);
    }
  };
  return (
    <VideoContext.Provider
      value={{
        playerStatus: state.playerStatus,
        loadedVideoState,
        playingVideoState,
        pausedVideoState,
        setPlayerRef,
        playFromStart,
        goBackFive,
        pauseVideo,
        playVideo,
        goForwardsFive,
        skipToNext,
      }}
      {...props}
    />
  );
};

export { VideoProvider, VideoContext };
