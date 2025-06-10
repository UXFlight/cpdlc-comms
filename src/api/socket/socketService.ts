import { SERVER_URL } from "../../constants/serverURL";

class SocketService {
  private socket: WebSocket | null = null;

  connect() {
    if (this.socket) return;

    this.socket = new WebSocket(SERVER_URL);
    this.socket.onopen = () => console.log("Socket connected");
  }

  send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  close() {
    this.socket?.close();
    this.socket = null;
  }
}

export const socketService = new SocketService(); //singleton