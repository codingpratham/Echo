import type { Request, Response } from 'express';
import type { Server } from 'socket.io';

export const registerChatSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        socket.join('chatroom');

        socket.on('disconnect', () => {
            console.log('a user disconnected', socket.id);
        });
    });
};

export const chatController = (_req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Chat socket is running',
    });
};
