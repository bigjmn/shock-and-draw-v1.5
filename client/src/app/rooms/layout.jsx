'use client'

import { SocketProvider } from "@/providers/SocketProvider"

export default function RoomWrapper({children}) {

    return (
        <SocketProvider>
            {children}
        </SocketProvider>
    )

}