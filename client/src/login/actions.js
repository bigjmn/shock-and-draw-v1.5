"user server"

import { redirect } from "next/navigation"

export async function createRoom(formData) {
    const newRoomData = Object.fromEntries(formData)
    const res = await fetch("http://localhost:4000/create", {
      cache: 'no-store',
      method: 'post',
      body: JSON.stringify(newRoomData)
      
    })
    const newOb = await res.json()
    const { roomcode } = newOb
    console.log(roomcode)
    redirect(`/rooms/${roomcode}`)
    return newOb


}