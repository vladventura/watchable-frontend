import io from "socket.io-client";

const socketioClient = io("http://192.168.1.152:4000");

console.log("socketioClient made");

export { socketioClient };
