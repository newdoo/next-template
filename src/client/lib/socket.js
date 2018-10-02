import io from 'socket.io-client'

class Socket {
  socket = null;

  connect = url => this.socket = io(url);
  addListener = (name, listener) => this.socket.on(name, listener);
}

let instance = null;
export default instance === null ? instance = new Socket : instance