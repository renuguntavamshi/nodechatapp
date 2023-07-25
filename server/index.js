const express=require('express');
const app=express();
const http=require('http');
const cors =require('cors');
const { Server }=require('socket.io');
const { log } = require('console');

//Using the cors middleware
app.use(cors());

//creating a server with http module
const server=http.createServer(app);


//Using the socket 
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    console.log(`User connected ${socket.id}`);

    socket.on("joinroom",(data)=>{
        socket.join(data)
        console.log(`User with id :${socket.id} joined room: ${data}`)
    })
    socket.on("sendmessage",(data)=>{
      console.log(data);   
      socket.to(data.room).emit("messagereceived",data)
    })
    socket.on("disconnect",()=>{
        console.log("socket disconnected",socket.id);
    })
})
server.listen(3001,()=>{
    console.log("Server listening on port 3001")
})