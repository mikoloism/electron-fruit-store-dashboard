const { link, db } = require('./connect.js');

class Fruit {
	static QUERY = {
		CREATE: `
		CREATE TABLE IF NOT EXISTS Fruit (
		id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
		name TEXT,
		cost INTEGER DEFAULT 0,
		quantity REAL DEFAULT 0,
		image TEXT
	)`,
		INSERT: `INSERT INTO Fruit (name, cost, quantity, image) VALUES (?, ?, ?, ?)`,
		UPDATE: {
			ALL: `UPDATE Fruit SET name = ?, cost = ?, quantity = ?, image = ? WHERE id = ?`,
			NAME: `UPDATE Fruit SET name = ? WHERE id = ?`,
			COST: `UPDATE Fruit SET cost = ? WHERE id = ?`,
			QUANTITY: `UPDATE Fruit SET quantity = ? WHERE id = ?`,
			IMAGE: `UPDATE Fruit SET image = ? WHERE id = ?`,
		},
		SELECT: {
			ALL: `SELECT * FROM Fruit`,
			BY_ID: `SELECT * FROM Fruit WHERE id = ?`,
		},
		DELETE: `DELETE FROM Fruit WHERE id = ?`,
		DROP: `DROP TABLE IF EXISTS Fruit`,
	};

	static init() {
		return new Promise(function (resolve, reject) {
			return db.run(Fruit.QUERY.CREATE, function (error) {
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
			Fruit.init()
				.then(() => {
					return db.all(
						Fruit.QUERY.SELECT.ALL,
						function (error, rows) {
							if (error) {
								reject(error);
								return;
							}
							return resolve(rows);
						},
					);
				})
				.catch(() => {
					console.log(`[MODEL][FRUIT] : fail init table`);
				});
		});
	}

	static readById(id) {
		return db.all(Fruit.QUERY.SELECT.BY_ID, id, function (error, rows) {
			if (error) {
				reject(error);
				return;
			}
			return resolve(rows);
		});
	}

	static insert(data) {
		return new Promise(function (resolve, reject) {
			Fruit.init()
				.then(() => {
					return db.run(Fruit.QUERY.INSERT, data, function (error) {
						if (error) {
							reject(error);
							return;
						}
						return resolve(this.lastId);
					});
				})
				.catch(() => {
					console.log(`[FRUIT-MODEL] : DATABASE NOT CREATED`);
				})
				.finally(() => {
					link.close();
				});
		});
	}

	static updateAll(id, newData) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Fruit.QUERY.UPDATE.ALL,
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
				Fruit.QUERY.UPDATE.NAME,
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

	static updateCost(id, newCost) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Fruit.QUERY.UPDATE.COST,
				[newCost, id],
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

	static updateQuantity(id, newQuantity) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Fruit.QUERY.UPDATE.QUANTITY,
				[newQuantity, id],
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

	static updateImage(id, newImage) {
		return new Promise(function (resolve, reject) {
			return db.run(
				Fruit.QUERY.UPDATE.IMAGE,
				[newImage, id],
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

	remove(id) {
		return new Promise(function (resolve, reject) {
			return db.run(Fruit.QUERY.DELETE, id, function (error) {
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
			return db.run(Fruit.QUERY.DROP, function (error) {
				if (error) {
					reject(error);
					return;
				}
				return resolve();
			});
		});
	}
}

module.exports = Fruit;
