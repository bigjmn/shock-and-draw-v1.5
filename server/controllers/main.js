import { lobbyList } from "../server.js"
export function socketcontroller(io, socket) {
    socket.on('disconnect', () => {
        // if no users left in lobby, remove lobby 
        console.log(socket.lobby.users.length)
        if (socket.lobby.users.length === 0) {
            lobbyList.splice(lobbyList.indexOf(socket.lobby), 1)
            return 
            
        }
        if (socket.lobby.midgame == false){
            io.emit('takeRoomData', {players:socket.lobby.users})
            io.to(socket.lobby.host).emit('takeHost')
          }
      
          if (socket.user.drawing){
            io.emit('drawerQuit')
          }
          if (socket.user.team){
            let team = socket.user.team
      
            team.removeUser(socket.user.id)
            console.log(team.users)
      
          }
        
    })
}