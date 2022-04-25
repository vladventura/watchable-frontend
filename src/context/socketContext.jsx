import React, { createContext, useReducer } from "react";
import io from "socket.io-client";
const socketioClient = io("http://192.168.1.152:4000");

// const socketioClient = io("http://192.168.1.152:4000");

const initState = {
  socketioClient,
  roomInfo: undefined,
  connect: () => {},
  disconnect: () => {},
  emitCreateRoom: () => {},
  emitAddVideo: () => {},
  setRoomInfo: (roomInfo) => {},
};

const SocketContext = createContext(initState);

const socketReducer = (state, action) => {
  switch (action.type) {
    case "CONNECT":
      return {
        ...state,
        socketioClient: action.payload,
      };
    case "DISCONNECT":
      return {
        ...state,
        socketioClient: undefined,
      };
    case "EMIT_CREATE_ROOM":
      return {
        ...state,
      };
    case "EMIT_ADD_VIDEO":
      return {
        ...state,
      };
    case "SET_ROOM_INFO":
      return {
        ...state,
        roomInfo: action.payload,
      };
    default:
      return state;
  }
};

const SocketProvider = (props) => {
  const [state, dispatch] = useReducer(socketReducer, initState);
  const connect = () => {
    dispatch({
      type: "CONNECT",
      payload: state.socketioClient ? state.socketioClient : socketioClient,
    });
  };
  const disconnect = () => {
    let action = {
      type: "DISCONNECT",
      payload: undefined,
    };
    if (state.socketioClient) {
      state.socketioClient.disconnect();
    }
    dispatch(action);
  };
  const setRoomInfo = (roomInfo) => {
    console.log(roomInfo);
    dispatch({
      type: "SET_ROOM_INFO",
      payload: roomInfo,
    });
  };
  const emitCreateRoom = () => {
    if (state.socketioClient) {
      state.socketioClient.emit("create-room");
      dispatch({
        type: "EMIT_CREATE_ROOM",
      });
    }
  };
  const emitAddVideo = (video) => {
    if (state.socketioClient) {
      state.socketioClient.emit("add-video", video);
      dispatch({
        type: "EMIT_ADD_VIDEO",
      });
    }
  };
  return (
    <SocketContext.Provider
      value={{
        socketioClient: state.socketioClient,
        connect,
        disconnect,
        emitCreateRoom,
        emitAddVideo,
        setRoomInfo,
      }}
      {...props}
    />
  );
};

export { SocketContext, SocketProvider };
