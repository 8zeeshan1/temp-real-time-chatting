import {createContext, useContext} from 'react';

const socketContext = createContext({
    socket: null,
    connectUser: (userName)=>{},
    disconnectUser: ()=>{}
});

export const SocketContextProvider = socketContext.Provider;
export const useSocket = () =>{
    return useContext(socketContext);
};
