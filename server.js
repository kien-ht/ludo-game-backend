const express = require('express')
const socket = require('socket.io')

const app = express()

app.use(express.static('public'))

const server = app.listen(3001, () => {
    console.log('Server Started!')
})

const io = socket(server)

// const mapRoom = []
// io.sockets.on('connection', (socket) => {
//   socket.on('create-room', function({ room, msg }) {
//     socket.join(room)
//     io.sockets.emit('create-room', mapRoom)
//   })
//   socket.on('say-hi', ({ room, msg }) => {
//     io.sockets.in(room).emit('say-hi', msg)
//   })
// })

const playerList = []

io.sockets.on('connection', (socket) => {
  playerList.push({
    id: socket.id
  })

  io.emit('newPlayerEnter', {
    playerList,
    id: socket.id
  })

  socket.on('diceHandler', (data) => {
    io.emit('diceHandler', data)
  })
  socket.on('homeHandler', (data) => {
    io.emit('homeHandler', data)
  })
  socket.on('pathHandler', (data) => {
    io.emit('pathHandler', data)
  })
  socket.on('finishHandler', (data) => {
    io.emit('finishHandler', data)
  })
  socket.on('skipBtnHandler', () => {
    io.emit('skipBtnHandler')
  })
  socket.on('slowHandler', () => {
    io.emit('slowHandler')
  })
  socket.on('shieldHandler', () => {
    io.emit('shieldHandler')
  })
  socket.on('trapHandler', () => {
    io.emit('trapHandler')
  })
  socket.on('setTrap', (data) => {
    io.emit('setTrap', data)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('playerLeave', {
      id: socket.id
    })
  })
})