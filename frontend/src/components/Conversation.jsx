import React from 'react'

function Conversation() {
  return (
    <div className="border-2 m-2 p-2 flex-1 flex flex-col">
      <form className='border fixed bottom-5 m-2 w-5xl'>
        <input className='border-2 rounded p-1 m-2 w-10/11' placeholder="message" type="text" />
        <button type='submit' className='border rounded p-1 m-2'>Send</button>
      </form>
    </div>
  )
}

export default Conversation