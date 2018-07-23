const socket_ = io();
window.socket = socket_;

socket_.on('connect', () => {
	console.log('connected');
});

export const socket = {
	emit: (event, args, callback) => {
		socket_.emit(event, {...args, url: window.location.href}, callback);
	},
	on: (event, args) => {
		socket_.on(event, args);
	},
};