const QUERY = {
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

module.exports.query = QUERY;
module.exports.init = function () {
	return db.run(QUERY.CREATE);
};
module.exports.readAll = function () {};
module.exports.readById = function () {};
module.exports.readByInvoice = function () {};
module.exports.insert = function () {};
module.exports.updateAll = function () {};
module.exports.updateInvoiceWeight = function () {};
module.exports.updateFruitWeight = function () {};
module.exports.removeById = function () {};
module.exports.removeInvoice = function () {};
module.exports.removeInvoiceItem = function () {};
module.exports.drop = function () {};
