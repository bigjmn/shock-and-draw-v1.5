// imports 
import express from "express";
import { createServer } from 'http'
import path from "path";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createUser } from "./utils/constructors/User.js";
import { createRoomId } from "./utils/helpers.js";
import { Lobby } from "./utils/constructors/Lobby.js";
import { socketcontroller } from "./controllers/main.js";
import cors from 'cors'
// set up express and socketio process 
const port = 4000 
//
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = createServer(app)


const io = new Server(server, {
    cors: {
        origin: '*'
    },
    
    
})
io.on('new_namespace', (namespace) => {
    console.log('new namespace is ', namespace.name)
})

// array for current games 
export const lobbyList = []

app.post('/create', (req, res) => {
    try {
        let roomcode = createRoomId(4)
        console.log(roomcode)
        while (lobbyList.findIndex(x => x.roomcode === roomcode) !== -1) {
            roomcode = createRoomId(4)
        }
        const urlpath = `/rooms/${roomcode}`
        // create the new namespace
        const nsp = io.of(urlpath)
        console.log(nsp)
        // create a connection listener
        nsp.on('connection', (socket) => {
            console.log('connected ', socket.id)
            // add user properties to socket 
            createUser(socket)
            // assign lobby to socket - this will be created before they actually connect 
            socket.lobby = lobbyList.find((x => x.roomcode === roomcode))
            socket.lobby.hostid = socket.id 
            // register the controller 
            // this includes removing itself when all sockets disconnect
            socketcontroller(nsp, socket)



            
        })
        // create new lobby with roomcode, namespace
        const newLobby = Lobby(roomcode, urlpath, nsp, roomcode)
        lobbyList.push(newLobby)
        // give the room code to the room creator so they can redirect
        return res.json({roomcode})
    } catch (err) {
        console.log(err)
        return res.json({error: err.message})
    }
})
// make sure SERVER listens, not app 
server.listen(port, () => {
    console.log(`server listening at port ${port}`)
})