const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http);

const roomList = require("./chatRoom.js")
const roomContent = require("./chatContent.js")

const port = 700;


const obj = [{
  icon: "string",
  username: "十爷",
  content: "美好的夜晚",
  time: new Date(2020, 2, 9, 13, 31)
}, {
  icon: "string",
  username: "卷卷",
  content: "是呀是呀",
  time: new Date()
}]

app.get('/getRooms', function (req, res) {
  res.send(JSON.stringify(roomList()))
})

app.post('/getChatContent', function (req, res) {
  res.send(JSON.stringify(obj))
})

http.listen(port, () => {
  console.log('connected to port: ' + port)
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("get message", (message, func) => {
    obj.unshift(message)
    func()
  })
});

