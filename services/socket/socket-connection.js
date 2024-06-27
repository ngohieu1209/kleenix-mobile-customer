import io from 'socket.io-client';
import { EXPO_PUBLIC_BASE_ICON_URL } from '@env'

let socket = null;

export const connectWithSocketServer = (userId) => {
  socket = io(EXPO_PUBLIC_BASE_ICON_URL, { transports: ['websocket']});
  socket.auth = { customerId: userId };

  socket.on('connect', () => {
    console.log('Successfully connected with socket.io server', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket.io server');
  });
};

export const socketDisconnect = () => {
  socket.disconnect();
};

export const getSocketInstance = () => {
  return socket;
};