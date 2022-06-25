const QUERY = {
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

module.exports.query = QUERY;
module.exports.init = function () {
	return db.run(QUERY.CREATE);
};
module.exports.readAll = function () {};
module.exports.readById = function () {};
module.exports.readByPhone = function () {};
module.exports.insert = function () {};
module.exports.updateAll = function () {};
module.exports.updateName = function () {};
module.exports.updatePhone = function () {};
module.exports.updateAvatar = function () {};
module.exports.remove = function () {};
module.exports.drop = function () {};
