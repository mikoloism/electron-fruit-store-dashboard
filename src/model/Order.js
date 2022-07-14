const { link, db } = require('./connect.js');

class Order {
	static QUERY = {
		CREATE: `
	CREATE TABLE IF NOT EXISTS Order (
		id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
		invoice_id INTEGER NOT NULL,
		fruit_id INTEGER NOT NULL,
		ship_weight REAL NOT NULL DEFAULT 0,
		FOREIGN KEY (invoice_id) REFERENCES Invoice(id),
		FOREIGN KEY (fruit_id) REFERENCES Fruit(id)
	)`,
		INSERT: `INSERT INTO Order (invoice_id, fruit_id, ship_weight) VALUES (?, ?, ?)`,
		UPDATE: {
			ALL: `UPDATE Order SET invoice_id=?, fruit_id=?, ship_weight=? WHERE id=?`,
			INVOICE_WEIGHT: `UPDATE Order SET ship_weight=? WHERE invoice_id=? AND fruit_id=?`,
			FRUIT_WEIGHT: `UPDATE Order SET ship_weight=? WHERE id=?`,
		},
		SELECT: {
			ALL: `SELECT * FROM Order`,
			BY_ID: `SELECT * FROM Order WHERE id = ?`,
			BY_INVOICE: `SELECT * FROM Order WHERE invoice_id = ?`,
		},
		DELETE: {
			ID: `DELETE FROM Order WHERE id = ?`,
			INVOICE_ITEM: `DELETE FROM Order WHERE invoice_id = ? AND fruit_id = ?`,
			INVOICE: `DELETE FROM Order WHERE invoice_id = ?`,
		},
		DROP: `DROP TABLE IF EXISTS Order`,
	};

	static init() {
		return new Promise(function (resolve, reject) {
			return db.run(Order.QUERY.CREATE, function (error) {
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
			return db.run(Order.QUERY.INSERT, [...data], function (error) {
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
				Order.QUERY.UPDATE.ALL,
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

	static updateInvoiceWeight(id, newWeight) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Order.QUERY.UPDATE.INVOICE_WEIGHT,
				[newWeight, id],
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

	static updateFruitsWeight(id, newWeight) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Order.QUERY.UPDATE.FRUIT_WEIGHT,
				[newWeight, id],
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
			return db.all(Order.QUERY.SELECT.ALL, [], function (error, rows) {
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
				Order.QUERY.SELECT.BY_ID,
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

	static readByInvoice(invoices, id) {
		return new Promise(function (resolve, reject) {
			return db.all(
				Order.QUERY.SELECT.BY_INVOICE,
				[invoices, id],
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
	static drop() {
		return new Promise(function (resolve, reject) {
			return db.run(Order.QUERY.drop, function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve();
			});
		});
	}
	static removeById(id) {
		return new Promise(function (resolve, reject) {
			return db.run(Order.QUERY.remove, [id], function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve(this.changes);
			});
		});
	}
	static removeByInvoiceItem(InvoiceItem) {
		return new Promise(function (resolve, reject) {
			return db.run(Order.QUERY.remove, [InvoiceItem], function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve(this.changes);
			});
		});
	}

	static removeByInvoice(Invoice) {
		return new Promise(function (resolve, reject) {
			return db.run(Order.QUERY.remove, [Invoice], function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve(this.changes);
			});
		});
	}
}

module.exports = Order;
