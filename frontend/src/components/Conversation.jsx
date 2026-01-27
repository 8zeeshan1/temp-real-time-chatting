import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSocket } from "../context/socketContext";

function Conversation() {
  const { state } = useLocation(); // state.uid = other user
  const { socket } = useSocket();

  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const myId = JSON.parse(localStorage.getItem("Current_user")).uid;
  const otherId = state.uid;


  // ---------- load messages when chat changes ----------
  useEffect(() => {
  // Load messages only when chat changes
  const stored = localStorage.getItem("messages");
  const msgs = stored ? JSON.parse(stored) : [];
  const currentUser = JSON.parse(localStorage.getItem("Current_user"));
  
  const chatMessages = msgs.filter(msg => 
    (msg.to === state.uid && msg.from === currentUser.uid) ||
    (msg.from === state.uid && msg.to === currentUser.uid)
  ).map(msg => ({
    m: msg.message,
    c: msg.from === currentUser.uid ? "bg-red-400" : "bg-green-300"
  }));
  
  setMessages(chatMessages);
}, [state.uid]); // Only run when chat changes


  // ---------- socket listener ----------
  useEffect(() => {
  if (!socket.current) return;

  const handler = (data) => {
    // 1. Save to localStorage
    const stored = localStorage.getItem("messages");
    const msgs = stored ? JSON.parse(stored) : [];
    msgs.push(data);
    localStorage.setItem("messages", JSON.stringify(msgs));
    
    // 2. Update state immediately after saving
    const currentUser = JSON.parse(localStorage.getItem("Current_user"));
    
    if (data.to === state.uid && data.from === currentUser.uid) {
      setMessages(prev => [...prev, { m: data.message, c: "bg-red-400" }]);
    } else if (data.from === state.uid && data.to === currentUser.uid) {
      setMessages(prev => [...prev, { m: data.message, c: "bg-green-300" }]);
    }
    
    console.log("Message received from server", data);
  };

  socket.current.on("message-from-server", handler);
  
  return () => {
    socket.current.off("message-from-server", handler);
  };
}, [socket, state.uid]); // Only depend on socket and state.uid


  // ---------- send ----------
  const handleSubmit = (e) => {
  e.preventDefault();
  
  const currentUser = JSON.parse(localStorage.getItem("Current_user"));
  const msg = {
    from: currentUser.uid,
    to: state.uid,
    message: inputMsg,
    time: Date.now()
  };
  
  // 1. Save to localStorage
  const stored = localStorage.getItem("messages");
  const msgs = stored ? JSON.parse(stored) : [];
  msgs.push(msg);
  localStorage.setItem("messages", JSON.stringify(msgs));
  
  // 2. Update UI
  setMessages(prev => [...prev, { m: msg.message, c: "bg-red-400" }]);
  
  // 3. Send to server
  socket.current.emit("message-from-client", msg);
  
  setInputMsg("");
};

  return (
<div className="border-2 m-2 flex-1 flex flex-col overflow-hidden">
  <div className="border-b p-2">
        <b>{state.userName}</b>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {messages.map((msg, i) =>
          msg.c === "bg-green-300" ? (
            <div
              key={i}
              className="p-2 m-2 rounded-2xl max-w-xs bg-green-300"
            >
              {msg.m}
            </div>
          ) : (
            <div
              key={i}
              className="p-2 m-2 ml-auto rounded-2xl max-w-xs bg-red-400"
            >
              {msg.m}
            </div>
          )
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t p-2 flex gap-2">
        <input
          className="border-2 rounded p-2 flex-1"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          required
          placeholder="message"
        />
        <button className="bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default Conversation;
