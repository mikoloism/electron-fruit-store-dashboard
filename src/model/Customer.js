const { link, db } = require('./connect.js');

class Customer {
	static QUERY = {
		CREATE: `
		CREATE TABLE IF NOT EXISTS Customer (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT,
			phone TEXT NOT NULL,
			avatar TEXT,
			modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			join_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
		INSERT: `INSERT INTO Customer (name, phone, avatar) VALUES (?, ?, ?)`,
		UPDATE: {
			ALL: `UPDATE Customer SET name = ?, phone = ?, avatar = ? WHERE id = ?`,
			NAME: `UPDATE Customer SET name = ? WHERE id = ?`,
			PHONE: `UPDATE Customer SET phone = ? WHERE id = ?`,
			AVATAR: `UPDATE Customer SET avatar = ? WHERE id = ?`,
		},
		SELECT: {
			ALL: `SELECT * FROM Customer`,
			BY_ID: `SELECT * FROM Customer WHERE id = ?`,
			BY_PHONE: `SELECT * FROM Customer WHERE phone = ?`,
		},
		DELETE: `DELETE FROM Customer WHERE id = ?`,
		DROP: `DROP TABLE IF EXISTS Customer`,
	};

	static init() {
		return new Promise(function (resolve, reject) {
			return db.run(Customer.QUERY.CREATE, function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve();
			});
		});
	}

	static readAll() {
		return new Promise(function (resolve, reject) {
			return db.all(Customer.QUERY.SELECT.ALL, function (error, rows) {
				if (error) {
					reject(error);
					return;
				}
				return resolve(rows);
			});
		});
	}

	static readById(id) {
		return new Promise(function (resolve, reject) {
			return db.all(
				Customer.QUERY.SELECT.BY_ID,
				[id],
				function (error, rows) {
					if (error) {
						reject(error);
						return;
					}
					return resolve(rows);
				},
			);
		});
	}

	static readByPhone(phone) {
		return new Promise(function (resolve, reject) {
			return db.all(
				Customer.QUERY.SELECT.BY_PHONE,
				[phone],
				function (error, rows) {
					if (error) {
						reject(error);
						return;
					}
					return resolve(rows);
				},
			);
		});
	}

	static insert(data) {
		return new Promise(function (resolve, reject) {
			return db.run(Customer.QUERY.INSERT, data, function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve(this.lastId);
			});
		});
	}

	static updateAll(id, newData) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Customer.QUERY.UPDATE.ALL,
				[...newData, id],
				function (error) {
					if (error) {
						reject(error);
						return;
					}
					return resolve(this.changes);
				},
			);
		});
	}

	static updateName(id, newName) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Customer.QUERY.UPDATE.NAME,
				[newName, id],
				function (error) {
					if (error) {
						reject(error);
						return;
					}
					return resolve(this.changes);
				},
			);
		});
	}

	static updatePhone(id, newPhone) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Customer.QUERY.UPDATE.PHONE,
				[newPhone, id],
				function (error) {
					if (error) {
						reject(error);
						return;
					}
					return resolve(this.changes);
				},
			);
		});
	}

	static updateAvatar(id, newAvatar) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Customer.QUERY.UPDATE.AVATAR,
				[newAvatar, id],
				function (error) {
					if (error) {
						reject(error);
						return;
					}
					return resolve(this.changes);
				},
			);
		});
	}

	static remove(id) {
		return new Promise(function (resolve, reject) {
			return db.run(Customer.QUERY.DELETE, id, function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve(this.changes);
			});
		});
	}

	static drop() {
		return new Promise(function (resolve, reject) {
			return db.run(Customer.QUERY.DROP, function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve();
			});
		});
	}
}

module.exports = Customer;
