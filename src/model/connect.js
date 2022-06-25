const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE_PATH = path.join(__dirname, 'main.sqlite');
let db;

const connect = () =>
	new Promise((resolve, reject) => {
		db = new sqlite3.Database(DB_FILE_PATH, (err) => {
			if (err) {
				reject(err.message);
			}
			console.log(`Connected to "${DB_FILE_PATH}" SQlite database.`);
			resolve();
		});
	});

const disconnect = () =>
	new Promise((resolve, reject) => {
		db.close((err) => {
			if (err) {
				reject(err.message);
				return;
			}
			console.log('Close the database connection.');
			resolve();
		});
	});

// HINT : For SELECT => db.all(query, [...param], function (error, rows) {})
// HINT : For INSERT => db.run(query, [...param], function (error) { this.lastId, this.changes /* inserted-rows-count */ })
// HINT : For UPDATE => db.run(query, [...param], function (error) { this.changes /* updated-rows-count */ })
// HINT : For DELETE => db.run(query, param | [...param], function (error) { this.changes /* deleted-row(s)-count */ })

module.exports = {
	connect,
	db: () => db,
	disconnect,
};
