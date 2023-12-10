import { redirect } from "next/navigation"
export default function Home() {
  async function createRoom() {
    'use server'
    
    const res = await fetch("http://localhost:4000/create", {
      cache: 'no-store',
      method: 'post',
      
    })
    const newOb = await res.json()
    const { roomcode } = newOb
    console.log(roomcode)
    redirect(`/rooms/${roomcode}`)
    return newOb

  }
  return (
    <main>
      <form action={createRoom}>
        <button>Submit</button>
      </form>

    </main>
  )
}
