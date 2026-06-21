import socket from 'socket.io';

export const chatController = (io: socket.Server) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.rooms.add('chatroom');
          
    });

}