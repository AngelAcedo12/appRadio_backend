const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require('cors')
const hostname = "localhost";
const port = 3001;
// when using middleware `hostname` and `port` must be provided below



const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
app.use(cors())


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
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