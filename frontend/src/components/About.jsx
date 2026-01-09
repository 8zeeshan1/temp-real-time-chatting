import React, { useEffect, useState } from 'react'

function About() {
    const [me, setMe] = useState();
    
    useEffect(()=>{
              const name = JSON.parse(localStorage.getItem('Current_user'))
              console.log(name)
              setMe(name.userName);
    },[])
  return (
    <div className="border-2 m-2 p-2 flex-1 flex flex-col">
        <b>About</b>
        <h2>Logged in as {me}</h2>
    </div>
  )
}

export default About