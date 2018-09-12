const socket_ = io(null, {'reconnection': true,'reconnectionDelay': 500,'maxReconnectionAttempts':Infinity});
window.socket = socket_;

socket_.on('connect', () => {
  console.log('connected');
});

export const socket = {
  emit: (event, args, callback) => {
    socket_.emit(event, {...args, url: window.location.href}, callback);
  },
  on: socket_.on.bind(socket_),
  removeListener: socket_.removeListener.bind(socket_),
  off: socket_.off.bind(socket_),
};
