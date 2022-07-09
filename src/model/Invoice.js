const { link, db } = require('./connect.js');

class Invoice {
	static QUERY = {
		CREATE: `
		CREATE TABLE IF NOT EXISTS Invoice (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			customer_id INTEGER NOT NULL,
			total_price INTEGER NOT NULL,
			buy_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (customer_id) REFERENCES Customer(id)
		)`,
		INSERT: `INSERT INTO Invoice (customer_id, total_price) VALUES (?, ?)`,
		UPDATE: {
			ALL: `UPDATE Invoice SET customer_id=?, total_price=? WHERE id=?`,
			INVOICE_PRICE: `UPDATE Invoice SET total_price=? WHERE id=?`,
		},
		SELECT: {
			ALL: `SELECT * FROM Invoice`,
			BY_ID: `SELECT * FROM Invoice WHERE id = ?`,
			BY_CUSTOMER: `SELECT * FROM Invoice WHERE customer_id = ?`,
		},
		DELETE: `DELETE FROM Invoice WHERE id = ?`,
		DROP: `DROP TABLE IF EXISTS Invoice`,
	};

	static init() {
		return new Promise(function (resolve, reject) {
			return db.run(Invoice.QUERY.CREATE, function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve();
			});
		});
	}

	static insert(data) {
		return new Promise(function (resolve, reject) {
			return db.run(Invoice.QUERY.INSERT, data, function (error) {
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
				Invoice.QUERY.UPDATE.ALL,
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

	static updatePrice(id, newPrice) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Invoice.QUERY.UPDATE.INVOICE_PRICE,
				[newPrice, id],
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

	static readAll() {
		return new Promise(function (resolve, reject) {
			return db.all(Invoice.QUERY.SELECT, function (error, rows) {
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
				Invoice.QUERY.SELECT.BY_ID,
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

	static readByCustomer(customer_id) {
		return new Promise(function (resolve, reject) {
			return db.all(
				Invoice.QUERY.SELECT.BY_CUSTOMER,
				[customer_id],
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

	static remove(id) {
		return new Promise(function (resolve, reject) {
			return db.run(Invoice.QUERY.DELETE, [id], function (error) {
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
			return db.run(Invoice.QUERY.drop, function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve();
			});
		});
	}
}
module.exports = Invoice;
