import React, { useEffect, useState } from 'react'
import {data, useNavigate, useParams} from 'react-router'
import {useSocket} from '../context/socketContext'

function Conversation() {
const navigate = useNavigate()
const [inptmsg, setInptmsg] = useState("");
const {chatid} = useParams();
const {socket} = useSocket();
const [messages, setMessages] = useState([]) ;

   useEffect(() => {
  if (!socket.current) return;

  const handler = (data) => {
    console.log("it's the message from server", data);
    setMessages(prev => [...prev, {m: data, c: "bg-green-300"}]);
  };

  socket.current.on("message-from-server", handler);

  return () => {
    socket.current.off("message-from-server", handler);
  };
}, [socket]);


  const handleSubmit = (e) =>{
    e.preventDefault();
    const msg = {
      from: socket.current.id,
      to: chatid,
      message: inptmsg,
      time: Date.now()
    };
    console.log(msg);
    setMessages(prev=> [...prev, {m: inptmsg, c: "bg-red-400"}])
    socket.current.emit("message-from-client",msg);
    setInptmsg("");
  }

  return (
    <div className="border-2 m-2 p-2 flex-1 flex flex-col">
      {messages.map((message)=>
        (message.c === "bg-green-300")?<h2 className="p-2 m-2 border rounded-2xl w-72 bg-green-300">{message.m}</h2>:<h2 className="p-2 m-2 ml-40 rounded-2xl border bg-red-400">{message.m}</h2>
      )}
      <form className='border fixed bottom-5 m-2 w-5xl' onSubmit={(e)=>handleSubmit(e)}>
        <input className='border-2 rounded p-1 m-2 w-10/11' required placeholder="message" value={inptmsg} onChange={(e)=>setInptmsg(e.target.value)} type="text" />
        <button type='submit' className='border rounded p-1 m-2'>Send</button>
      </form>
    </div>
  )
}

export default Conversation