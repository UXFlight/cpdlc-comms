import { io, Socket } from 'socket.io-client';
import { SERVER_URL } from '../constants/serverURL';

class SocketClientService {
  private socket: Socket;

  constructor() {
    this.socket = io(SERVER_URL, {
      transports: ['websocket'],
      autoConnect: false,
    });
  }

  connect() {
    console.log('Connecting to socket server...');
    if (!this.isSocketAlive()) {
      this.socket.connect();
    }
  }

  disconnect() {
    this.socket.disconnect();
  }

  isSocketAlive(): boolean {
    return this.socket && this.socket.connected;
  }

  getSocketId(): string {
    return this.socket.id ?? '';
  }

  listen<T>(event: string, callback: (data: T) => void): void {
    this.socket.on(event, callback);
  }

  off<T>(event: string, callback?: (data: T) => void): void {
    if (callback) {
      this.socket.off(event, callback);
    } else {
      this.socket.off(event);
    }
  }

  send<T>(event: string, data?: T, callback?: () => void): void {
    this.socket.emit(event, ...[data, callback].filter(Boolean));
  }
}

export const socketService = new SocketClientService();

