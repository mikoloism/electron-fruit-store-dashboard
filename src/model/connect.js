const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE_PATH = path.join(__dirname, 'main.sqlite');

class Database {
	db = {};
	dbFilePath = '';
	constructor(dbFilePath) {
		this.dbFilePath = dbFilePath;
		this.open();
	}

	open() {
		return new Promise((resolve, reject) => {
			this.db = new sqlite3.Database(this.dbFilePath, (err) => {
				if (err) {
					reject(err.message);
				}
				console.log(`[CONNECT_DATABASE] : "${this.dbFilePath}"`);
				resolve(this.db);
			});
		});
	}

	close() {
		return new Promise((resolve, reject) => {
			this.db.close((err) => {
				if (err) {
					reject(err.message);
					return;
				}
				console.log(`[DISCONNECT_DB] : "${this.dbFilePath}"`);
				resolve();
			});
		});
	}
}

// HINT : For SELECT => db.all(query, [...param], function (error, rows) {})
// HINT : For INSERT => db.run(query, [...param], function (error) { this.lastId, this.changes /* inserted-rows-count */ })
// HINT : For UPDATE => db.run(query, [...param], function (error) { this.changes /* updated-rows-count */ })
// HINT : For DELETE => db.run(query, param | [...param], function (error) { this.changes /* deleted-row(s)-count */ })

module.exports = ((dbFilePath) => {
	let link = new Database(dbFilePath);
	return { link, db: link.db };
})(DB_FILE_PATH);
