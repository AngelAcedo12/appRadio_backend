const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
const dev = process.env.NODE_ENV !== "production";
const hostname = dev=="production" ?  "app-radio-backend-git-main-angelacedo12s-projects.vercel.app" : "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below


const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {

  const httpServer = createServer(handler);
  
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    },
  });

  io.on("connection", (socket) => {
        
        socket.emit("connection","Connected")


        socket.on("message",(data) => {
            console.log(data)
            io.emit("message",data)
        })

        socket.on("audio",(stream) => {

            console.log(stream,"audio")
            console.log("Escuchandooo")
            io.emit("audio",stream)
        })

    });
   

 
 io.
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })

    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });


    
});