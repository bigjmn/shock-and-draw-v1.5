'use client'
import { createContext, useReducer, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
export const SocketContext = createContext()

// reducer for handling socket state changes
export const socketReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, userId: action.payload }
        case 'LOGOUT':
            return { ...state, userId: null }
        case 'SOCKET_CONNECT':
            return { ...state, socket: action.payload, isConnected: true }
        case 'SOCKET_DISCONNECT':
            return { ...state, socket: null, isConnected: false }
        default:
            return state 
    }
}

export const SocketProvider = ({ children }) => {
    const [state, dispatch] = useReducer(socketReducer, {
        userId: null,
        isConnected: false,
        socket: null
    })
    useEffect(() => {
        const newId = nanoid(6)
        dispatch({type: 'LOGIN', payload: newId})
    }, [])

    return (
        <SocketContext.Provider value={{...state, dispatch}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useConnection = () => {
    const context = useContext(SocketContext)
    if (context === undefined) {
        throw Error("hook used outside of scope!")
    }
    return context 
}

