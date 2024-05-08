import { Server } from "socket.io";
import http from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function GET(req, res) {
    console.log("First use, initiating server...");
  if (!res.socket.server.io) {
    console.log("First use, initiating server...");
    const httpServer = http.createServer((req, res) => {
      res.writeHead(200)   
      res.write("Hello World!");
      res.end();
    });
    const io = new Server(httpServer,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("Server already initialized");
  }

  res.end();

}
