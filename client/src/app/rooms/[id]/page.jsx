'use client'
import { useEffect, useState  } from 'react'
import io from 'socket.io-client'
import { useConnection } from '@/providers/SocketProvider'
export default function Room({ params }) {
    const { id } = params 
    const { socket, isConnected, dispatch } = useConnection()
    // const [socket, setSocket] = useState(null)
    // const [isConnected, setIsConnected] = useState(false)
    useEffect(() => {
        const newSocket = io.connect(`http://localhost:4000/rooms/${id}`, {
            path: `/socket.io/`
        })
        newSocket.on('connect', () => {
            dispatch({type: 'SOCKET_CONNECT', payload: newSocket})
            console.log('connected')
        })
        newSocket.on('disconnect', () => {
            dispatch({type: 'SOCKET_DISCONNECT'})
            console.log("disconnected")
        })
        

        return () => {
            if (socket) socket.disconnect()
        }
    }, [])

    return (
        <main>
            {isConnected && <h1>you are connected</h1>}
            {!isConnected && <h1>you are NOT connected</h1>}

        </main>
    )


}