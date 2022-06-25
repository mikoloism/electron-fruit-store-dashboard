const QUERY = {
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

module.exports.query = QUERY;
module.exports.init = function () {
	return db.run(QUERY.CREATE);
};
module.exports.readAll = function () {};
module.exports.readById = function () {};
module.exports.insert = function () {};
module.exports.updateAll = function () {};
module.exports.updateName = function () {};
module.exports.updateCost = function () {};
module.exports.updateQuantity = function () {};
module.exports.updateImage = function () {};
module.exports.remove = function () {};
module.exports.drop = function () {};
