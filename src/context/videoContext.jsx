import { createContext, useReducer } from "react";

const initState = {
  playerStatus: 0,
};

const VideoContext = createContext(initState);

const videoReducer = (state, action) => {
  switch (action.type) {
    case "LOADED_VIDEO":
    case "PAUSE_VIDEO":
    case "PLAY_VIDEO":
      return {
        ...state,
        playerStatus: action.payload,
      };
    default:
      return state;
  }
};

const VideoProvider = (props) => {
  const [state, dispatch] = useReducer(videoReducer, initState);
  const loadVideo = (playerStatus) => {
    dispatch({ type: "LOADED_VIDEO", payload: playerStatus });
  };
  const playVideo = (playerStatus) => {
    dispatch({ type: "PLAY_VIDEO", payload: playerStatus });
  };
  const pauseVideo = (playerStatus) => {
    dispatch({ type: "PAUSE_VIDEO", payload: playerStatus });
  };
  return (
    <VideoContext.Provider
      value={{
        playerStatus: state.playerStatus,
        loadVideo,
        playVideo,
        pauseVideo,
      }}
      {...props}
    />
  );
};

export { VideoProvider, VideoContext };
