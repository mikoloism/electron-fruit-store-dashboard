const express = require('express');
const path = require('path');
const router = require('./src/router.js');

const app = express();

// declare constant
const SERVER_PORT = 3000;
const STATIC_PUBLIC = express.static(__dirname + '/public');
const STATIC_VIEWS = express.static(__dirname + '/src/pages');
const STATIC_NORMALIZE_CSS = express.static(
	__dirname + '/node_modules/normalize.css',
);

// setup statics
app.use('/static', STATIC_PUBLIC);
app.use('/static/css', STATIC_NORMALIZE_CSS);
app.use('/view', STATIC_VIEWS);

// setup api and routers
app.use('/api', router);

// server handler
function handleServer() {
	return new Promise((resolve, reject) => {
		return app.listen(SERVER_PORT, () => {
			console.log(
				`[SERVER] : listening on http://127.0.0.1:${SERVER_PORT}`,
			);
			return resolve(SERVER_PORT, app);
		});
	});
}

module.exports.app = handleServer;
