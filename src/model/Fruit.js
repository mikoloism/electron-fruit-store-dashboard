const { link, db } = require('./connect.js');

class Fruit {
	constructor() {}

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
		return db.run(Fruit.QUERY.CREATE);
	}

	static readAll() {
		return db.all(Fruit.QUERY.SELECT.ALL);
	}

	static readById(id) {
		return db.all(Fruit.QUERY.SELECT.BY_ID);
	}

	static insert(data) {
		return db.run(Fruit.QUERY.INSERT, data, function (error) {
			return this.lastId;
		});
	}

	static updateAll(id, newData) {
		return db.run(
			Fruit.QUERY.UPDATE.ALL,
			[...newData, id],
			function (error) {
				return error;
			},
		);
	}

	static updateName(id, newName) {
		return db.run(Fruit.QUERY.UPDATE.NAME, [newName, id], function (error) {
			return error;
		});
	}

	static updateCost(id, newCost) {
		return db.run(Fruit.QUERY.UPDATE.COST, [newCost, id], function (error) {
			return error;
		});
	}

	static updateQuantity(id, newQuantity) {
		return db.run(
			Fruit.QUERY.UPDATE.QUANTITY,
			[newQuantity, id],
			function (error) {
				return error;
			},
		);
	}

	static updateImage(id, newImage) {
		return db.run(
			Fruit.QUERY.UPDATE.IMAGE,
			[newImage, id],
			function (error) {
				return error;
			},
		);
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
		return db.run(Fruit.QUERY.DROP, function (error) {
			return error;
		});
	}
}

module.exports = Fruit;
