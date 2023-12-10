import { NextResponse } from "next/server"
export async function POST(req, res) {
    console.log('I am hit')
    const myres = "hello"
    return NextResponse.json({message: myres}, {status: 200})
    
}