const express = require('express');
const path = require('path');
const router = require('./src/router.js');

const api = express();
api.use('/', (req, res) => {
	res.send('[API] : successfully!');
});

const app = express();

app.use('/static', express.static(__dirname + '/public'));
app.use(
	'/static/css',
	express.static(__dirname + '/node_modules/normalize.css'),
);
app.get('/', (req, res) => {
	return res.sendFile(path.resolve('src', 'pages', 'login.html'));
	// return res.sendFile(path.resolve('public', 'index.html'));
});

const APP_SERVER_PORT = 3000;
const API_SERVER_PORT = 8080;
module.exports.api = () =>
	new Promise((resolve, reject) => {
		api.listen(API_SERVER_PORT, () => {
			console.log(
				`[API_SERVER] : listening on http://127.0.0.1:${API_SERVER_PORT}`,
			);
			return resolve(API_SERVER_PORT, api);
		});
	});

module.exports.app = () =>
	new Promise((resolve, reject) => {
		return app.listen(APP_SERVER_PORT, () => {
			console.log(
				`[MAIN_SERVER] : listening on http://127.0.0.1:${APP_SERVER_PORT}`,
			);
			return resolve(APP_SERVER_PORT, app);
		});
	});
