import {createContext, useContext} from 'react';

const socketContext = createContext({
    socket: null,
    connectUser: (userInfo)=>{},            //change
    disconnectUser: ()=>{}
});

export const SocketContextProvider = socketContext.Provider;
export const useSocket = () =>{
    return useContext(socketContext);
};
