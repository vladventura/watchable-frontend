import { useContext } from "react";
import "./MediaButtons.css";
import { VideoContext } from "../context/videoContext";

const MediaButtons = ({ videoPlaying }) => {
  const { playerStatus } = useContext(VideoContext);

  return (
    <div className="media-buttons">
      <button className="media-button backward">
        <i className="fas fa-backward"></i>
      </button>
      <button className="media-button play">
        <i className={`fas fa-${playerStatus === 1 ? "pause" : "play"}`}></i>
      </button>
      <button className="media-button forward">
        <i className="fas fa-forward"></i>
      </button>
    </div>
  );
};
export { MediaButtons };
