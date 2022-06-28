const express = require('express');
const path = require('path');
const router = require('./src/router/index.js');

const app = express();
const pkg = (name) => __dirname + `/node_modules/${name}`;

// declare constant
const SERVER_PORT = 3000;
const STATIC_PUBLIC = express.static(__dirname + '/public');
const STATIC_NORMALIZE_CSS = express.static(pkg('normalize.css'));

// setup statics
app.use('/static', STATIC_PUBLIC);
app.use('/static/css/normalize', STATIC_NORMALIZE_CSS);

// setup api and routers
app.use('/api', router.api);
app.use('/view', router.view);

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

module.exports = handleServer;
