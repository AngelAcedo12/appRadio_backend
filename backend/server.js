const { stat } = require("fs");
const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
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

  io.on("connection", async (socket) => {
        
        
       const idHandShake = socket.id;
       const {nameTransmision,  type} = socket.handshake.query;
      console.log(nameTransmision, type)
      if(type==='locutor'){

         socket.join(nameTransmision)
        

      }
      if(type==='listener'){

        socket.join(nameTransmision)
        
        socket.emit("join to transmision",
        {
            message: `Hola dispositivo: ${idHandShake} se unio a la transmision de ${nameTransmision}`,
            id: idHandShake    
        })  
     
      }
     
        socket.on("audio",async (stream) => {
            try{
                 console.log("Audio recibido")
                const audioBlob = new Blob([stream], { type: 'audio/wav' });
               
                io.emit("audio",await audioBlob.arrayBuffer().then(buffer => buffer));

            }catch(error){
                console.log(error)
            }
        });


        socket.on("disconnect", (socket) => {
       
            console.log("Se desconecto", socket)
          
        });
        
    
    }
  );
  
    
 
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