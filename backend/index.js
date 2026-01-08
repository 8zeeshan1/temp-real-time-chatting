const cors = require('cors');
const express = require('express')
const { createServer } = require('http');
const {Server} = require("socket.io");
require('dotenv').config();
const app = express();
const server = createServer(app);
let users = require("./storage/users");
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
    socket.on("userName", (data)=>{
        users.unshift({
            id: socket.id,
            userName: data
        })
        console.log(users);
        io.emit("active-users", users)
    })
    socket.on("disconnect", ()=>{
        users = users.filter(user=> user.id !== socket.id)
        console.log("After Disconnect: ", users);
        console.log("user Disconnected")
        io.emit("active-users", users);
    })
    socket.on('check', (data)=>{
        console.log(data,' Pong!')
    })
    socket.on("message-from-client", (data)=>{
        console.log(data);
        io.to(data.to).emit("message-from-server", data.message)
    })
    console.log(socket.id)
    console.log("User connected");
    
});



// app.get('/', (req, res)=>{
//     return res.json("Access Granted");
// });

// app.post('/login', (req, res)=>{
//     const body = req.body;
//     console.log(body);
//     if(body.userName) return res.json({success: true})
//     else return res.json({success: false});
// })


server.listen(PORT, ()=>{
    console.log("Server Started at PORT: ", PORT)
});