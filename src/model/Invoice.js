const QUERY = {
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

module.exports.query = QUERY;
module.exports.init = function () {
	return db.run(QUERY.CREATE);
};
module.exports.readAll = function () {};
module.exports.readById = function () {};
module.exports.readByCustomer = function () {};
module.exports.insert = function () {};
module.exports.updateAll = function () {};
module.exports.updateTotalPrice = function () {};
module.exports.remove = function () {};
module.exports.drop = function () {};
