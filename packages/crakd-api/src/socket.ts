import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { onlineUsers, updateUserIsOnline } from './db';

const users = {};

function getCookie(cookie, name) {
  cookie = ';' + cookie;
  cookie = cookie.split('; ').join(';');
  cookie = cookie.split(' =').join('=');
  cookie = cookie.split(';' + name + '=');
  if (cookie.length < 2) {
    return null;
  } else {
    return decodeURIComponent(cookie[1].split(';')[0]);
  }
}

setInterval(async () => {
  const currentUsers = await onlineUsers();
  currentUsers.forEach(async (u) => {
    if (!users[u._id.toString()]) {
      updateUserIsOnline(u._id, false);
    }
  });
}, 5 * 60 * 1000);

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.use((socket: any, next) => {
    if (socket.handshake.headers.cookie) {
      const token = getCookie(socket.handshake.headers.cookie, 'token');
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
          return next(new Error('Authentication error'));
        }
        socket.authUser = decoded.user;
        next();
      });
    } else {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: any) => {
    console.log('Socket connection. socket.connected: ', socket.connected);
    const userId = socket.authUser._id;
    if (!users[userId]) {
      users[userId] = {
        socketId: socket.id,
        userId: socket.authUser._id,
      };
    }

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      updateUserIsOnline(userId, false);
      delete users[socket.authUser._id];
    });
  });
};

