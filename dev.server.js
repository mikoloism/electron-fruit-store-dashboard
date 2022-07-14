const server = require('./server.js');

server().then((res) => {
	console.log('[DEV_SERVER] : running on');
});
