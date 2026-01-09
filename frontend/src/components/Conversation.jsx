import React, { useEffect, useState } from 'react'
import {data, useLocation, useNavigate, useParams} from 'react-router'
import {useSocket} from '../context/socketContext'

function Conversation() {
const { state } = useLocation();
const [inptmsg, setInptmsg] = useState("");
const {chatid} = useParams();
const {socket} = useSocket();
const [messages, setMessages] = useState([]) ;

  useEffect(()=>{
      console.log("phir remount hua")
  },[state])

   useEffect(() => {
  if (!socket.current) return;
  setMessages([]);

  const handler = (data) => {
    console.log("it's the message from server", data);
    setMessages(prev => [...prev, {m: data, c: "bg-green-300"}]);
  };

  socket.current.on("message-from-server", handler);

  return () => {
    socket.current.off("message-from-server", handler);
  };
}, [socket, state]);


  const handleSubmit = (e) =>{
    e.preventDefault();
    const msg = {
      from: (JSON.parse(localStorage.getItem("Current_user"))).uid,
      to: state.uid,
      message: inptmsg,
      time: Date.now()
    };
    console.log(msg);
    setMessages(prev=> [...prev, {m: inptmsg, c: "bg-red-400"}])
    socket.current.emit("message-from-client",msg);
    setInptmsg("");
  }

  return (
  <div className="border-2 m-2 flex-1 flex flex-col overflow-hidden">
    {/* Header */}
    <div className='border-b w-full p-2'>
      <b>{state.userName}</b>
    </div>
    
    {/* Messages Container - scrollable */}
    <div className='flex-1 overflow-y-auto overflow-x-hidden p-2'>
      {messages.map((message, index) => (
        message.c === "bg-green-300" ? 
          <div key={index} className="p-2 m-2 border rounded-2xl max-w-xs bg-green-300 break-words">
            {message.m}
          </div> 
          : 
          <div key={index} className="p-2 m-2 ml-auto border rounded-2xl max-w-xs bg-red-400 break-words">
            {message.m}
          </div>
      ))}
    </div>
    
    {/* Input Form - at bottom */}
    <form className='border-t p-2 flex gap-2 shrink-0' onSubmit={(e) => handleSubmit(e)}>
      <input 
        className='border-2 rounded p-2 flex-1 min-w-0' 
        required 
        placeholder="message" 
        value={inptmsg} 
        onChange={(e) => setInptmsg(e.target.value)} 
        type="text" 
      />
      <button type='submit' className='border rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 shrink-0'>
        Send
      </button>
    </form>
  </div>
)
}

export default Conversation