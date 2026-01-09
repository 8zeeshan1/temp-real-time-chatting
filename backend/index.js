const cors = require('cors');
const express = require('express')
const { createServer } = require('http');
const {Server} = require("socket.io");
require('dotenv').config();
const app = express();
const server = createServer(app);
const users = require("./storage/users");

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
});
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200
}));

//app.use(express.json());
io.on("connection", (socket)=>{
    socket.on("userInfo", (data)=>{
        users.set(data.uid, {sid: socket.id, userName: data.userName})
        console.log(users);
        io.emit("active-users", [...users])
    })
    socket.on("disconnect", ()=>{
        for(const [key, value] of users){
            if(value.sid === socket.id){
                users.delete(key)
                break;
            }
        }
        console.log("After Disconnect: ", users);
        console.log("user Disconnected")
        io.emit("active-users", [...users]);
    })
    socket.on("message-from-client", (data)=>{
        console.log(data);
        io.to((users.get(data.to)).sid).emit("message-from-server", data.message)
    })
    console.log(socket.id)
    console.log("User connected");
    
});

server.listen(PORT, ()=>{
    console.log("Server Started at PORT: ", PORT)
});