class User{
    constructor(socket){
      this.username = ''
      this.id = socket.id
      this.teamcolor = 'none'
      this.team = null
      this.drawing = false
      this.host = false
      this.correct = 0
  
    }
    get tagname(){
      var tag = this.username
      if (this.drawing){
        tag += ' ✏️'
      }
      return tag
    }
  }
  // function randomUsername(){
  //   const readFileLines = filename =>
  //  fs.readFileSync(filename)
  //  .toString('UTF8')
  //  .split('\n');
  //
  //  var arr = readFileLines('utils/namelist.txt');
  //
  //  let newname = arr[Math.floor(Math.random()*arr.length)];
  //  return newname
  // }

const createUser = (socket) => {
    var sockUser = new User(socket)
    socket.user = sockUser
}
export { createUser }
