const socketio = require("socket.io");

let io;

const getIo = () => {
  return io;
};

const init = (httpServer) => {
  io = socketio(httpServer, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", socket => {

    console.log("Socket IO client connected!");

    socket.on("hello", msg => {
      console.log(msg);
      io.emit("hello", "world");
    });
  });

  return io;
};


module.exports = {
  getIo,
  init,
};
