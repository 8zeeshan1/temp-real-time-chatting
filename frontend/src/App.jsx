import { useRef, useState } from 'react'
import './App.css'
import {io} from 'socket.io-client'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import {createBrowserRouter} from 'react-router'
import {RouterProvider} from 'react-router/dom'


import {SocketContextProvider} from './context/socketContext.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/home",
    element: <Home/>
  }
]);

function App() {
  

const socket = useRef(null)

const connectUser = (userName)=>{
  const newSocket = io(import.meta.env.VITE_SERVER_URL)
  newSocket.on("connect", ()=>{
    newSocket.emit("userName", userName)
  })
  socket.current = newSocket;
}

const disconnectUser = ()=>{
  if(socket?.current){
    socket.current.disconnect();
    socket.current = null;
  }
}

  return (
          <SocketContextProvider value={{socket, connectUser, disconnectUser}}>
            <RouterProvider router={router}/>
          </SocketContextProvider>
  )
}

export default App
