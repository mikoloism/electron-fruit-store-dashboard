const express = require('express');
const path = require('path');

const app = express();

const SERVER_PORT = 3000;

app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/*', (req, res) => {
	return res.sendFile(path.resolve('public', 'index.html'));
});

module.exports = () =>
	new Promise((resolve, reject) => {
		return app.listen(SERVER_PORT, () => {
			console.log(`[SERVER] : listening on port ${SERVER_PORT}`);
			return resolve(SERVER_PORT, app);
		});
	});
