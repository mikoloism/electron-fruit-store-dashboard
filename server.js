const express = require('express');
const path = require('path');
const viewRouter = require('./src/router/view.js');
const apiRouter = require('./src/router/api.js');

const app = express();

app.use('/static', express.static(__dirname + '/public'));
app.use(
	'/static/css',
	express.static(__dirname + '/node_modules/normalize.css'),
);

app.use('/view', viewRouter);
app.use('/api', apiRouter);

const SERVER_PORT = 3000;
module.exports.app = () =>
	new Promise((resolve, reject) => {
		return app.listen(SERVER_PORT, () => {
			console.log(
				`[MAIN_SERVER] : listening on http://127.0.0.1:${SERVER_PORT}`,
			);
			return resolve(SERVER_PORT, app);
		});
	});
