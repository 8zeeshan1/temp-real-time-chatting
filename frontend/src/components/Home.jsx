import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router';
import { useSocket } from '../context/socketContext';

function Home() {
  const navigate = useNavigate();
  const [names, setNames] = useState([]);
  const {socket, connectUser} = useSocket();

  useEffect(()=>{
    if(!localStorage.getItem('Current_user')){
      navigate('/');
    }
    else{
      if(socket?.current === null){
        connectUser(JSON.parse(localStorage.getItem('Current_user')))
      }
    }
  }, [])

  useEffect(()=>{ 
    socket.current.on("active-users", (users)=>{
      setNames([])
      users.forEach(([uid, user]) => {
        setNames(prev=>[...prev, {uid: uid, userName: user.userName}])
      });
    })
},[]);

const handleUserClicks = (name)=>{
  console.log("it's clicking")
  navigate(`/home/chat/${name.uid}`, {
    state: name
  });
}

 return (
  <div className="flex h-screen w-screen">

    {/* Sidebar */}
    <div className="border-2 m-2 p-2 w-72 overflow-y-auto">
      <b className='text-2xl m-2'>Active Users:</b>

      {names.map((name) => (
        <div className="border-2 p-1 h-14 text-2xl rounded-2xl w-full flex" key={name.uid}>
          <button className = "w-full" value={name} onClick={()=>handleUserClicks(name)}>{name.userName}</button>
        </div>
      ))}
    </div>

    {/* Conversation Area */}
    {/*<div className="border-2 m-2 p-2 flex-1 flex flex-col">*/}

      {/* Scrollable inside */}
     {/*  <div className="overflow-y-auto flex-1 border"> */}
        <Outlet />
      {/*</div>*/}

    {/*</div>*/}

  </div>
);

}

export default Home