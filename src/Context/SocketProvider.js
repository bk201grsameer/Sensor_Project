import React, { createContext, useContext } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();
const socket = io.connect('http://localhost:8000');
const SocketProvider = ({ children }) => {

    // socket config
    useEffect(() => {
        function onConnect() {
            console.log(`[+] User connectd ${socket.id}`);
        }

        function onDisconnect() {
            console.log(`[+] User disconnected `);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        }
    }, [])

    return <SocketContext.Provider value={{ socket }}> {children}</SocketContext.Provider>;
};

const SocketState = () => {
    return useContext(SocketContext);
};
export { SocketProvider, SocketState };