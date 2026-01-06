import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSocket } from "../context/socketContext";
function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const {connectUser} = useSocket();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await connectUser(userName);
    localStorage.setItem('Current_user', userName);
    setUserName("");
    await navigate('/home');
    
  };

  return (
    <div className="flex justify-center align-middle">
      <div className="bg-white border rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-center mb-4 font-semibold">
          Welcome! get started...
        </h2>

        <form onSubmit={handleSubmit} className="text-center">
          <input
            type="text"
            required
            className="border p-2 m-2 w-full rounded"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <button
            type="submit"
            className="border px-4 py-2 rounded mt-2"
          >
            Enter
          </button>
        </form>
      </div>
      </div>
  );
}
export default Login;
