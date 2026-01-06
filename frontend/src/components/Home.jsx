import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useSocket } from '../context/socketContext';

function Home() {
  const navigate = useNavigate();
  const [names, setNames] = useState([]);
  const [me, setMe] = useState();
  const {socket, connectUser} = useSocket();
  useEffect(()=>{
    if(!localStorage.getItem('Current_user')){
      navigate('/');
    }
    else{
      if(socket?.current === null){
        connectUser(localStorage.getItem('Current_user'))
      }
      
      setMe(localStorage.getItem('Current_user'));
    }
  }, [])

  useEffect(()=>{
    if(socket.current)
    socket.current.emit('check', "Ping!");
  },[socket])

  useEffect(()=>{ 
    socket.current.on("active-users", (users)=>{
      console.log(users);
      setNames(users);
    })
},[socket]);

  return (
    <div>
        <h2>logged in as {me}.</h2>
        <b>Active Users:</b>
        {names.map((name)=>
        <h2>{name.userName}</h2>
        )}
    </div>
  )
}

export default Home