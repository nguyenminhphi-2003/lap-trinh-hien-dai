import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('set username', (username) => {
    socket.username = username;
  });

  socket.on('join', (room) => {
    for (let [key] of socket.rooms) {
      if (key !== socket.id) {
        socket.leave(key);
      }
    }
    socket.join(room);
    socket.currentRoom = room;
    if (socket.username) {
      io.to(room).emit('user joined', `${socket.username} joined the room`);
    }
  });

  socket.on('chat message', (text) => {
    if (socket.currentRoom && socket.username) {
      io.to(socket.currentRoom).emit('chat message', { username: socket.username, text });
    }
  });

  socket.on('disconnect', () => {
    if (socket.currentRoom && socket.username) {
      io.to(socket.currentRoom).emit('user left', `${socket.username} left the room`);
    }
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});