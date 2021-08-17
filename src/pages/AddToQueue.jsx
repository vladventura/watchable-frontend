import { useEffect, useState } from "react";
import io from "socket.io-client";
const socketioClient = io("http://192.168.1.152:4000");

const AddToQueue = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const onClickItem = (result) => {
    socketioClient.emit("add-video", result);
    console.log("clicked");
  };

  useEffect(() => {
    return () => {
      socketioClient.disconnect();
    };
  }, []);

  const mappedResults =
    results &&
    results.map((result) => {
      return (
        <li className="list-group-item" key={result.id}>
          <div className="video-list media">
            <div className="media-left">
              <img
                className="media-object"
                src={result.thumbnails.default.url}
                alt="Video thumbnail"
              />
            </div>
            <div className="media-body">
              <div className="media-heading">{result.title}</div>
              <button onClick={() => onClickItem(result)} id={result.id}>
                Add
              </button>
            </div>
          </div>
        </li>
      );
    });

  const onClickSearch = () => {
    fetch(`http://192.168.1.152:4000/api/searchVideo?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setResults(data));
  };

  const onClickClear = () => {
    setResults([]);
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "auto",
          gridTemplateRows: "auto auto auto",
        }}
      >
        <div className="search-bar">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search in youtube"
          />
        </div>
        <div
          style={{
            justifySelf: "center",
          }}
        >
          <button style={{ margin: "0 1rem" }} onClick={onClickSearch}>
            Search
          </button>
          <button style={{ margin: "0 1rem" }} onClick={onClickClear}>
            Clear search
          </button>
        </div>

        <div style={{ margin: "1rem 2rem", paddingBottom: "80px" }}>
          {mappedResults}
        </div>
      </div>
    </>
  );
};

export { AddToQueue };
