// // const fruitModel = require('../model/Fruit.js');

// class FruitController {
// 	static read(rq, rs) {
// 		const fruitId = rq.query.id;
// 		if (fruitId) {
// 			return FruitController.readById(rq, rs);
// 		}

// 		return FruitController.readAll(rq, rs);
// 	}

// 	static readAll(req, res) {
// 		const FruitArray = [];
// 		return res
// 			.send({
// 				method: 'GET',
// 				path: '/api/fruit',
// 				status: 200,
// 				data: FruitArray,
// 			})
// 			.end();
// 	}

// 	static readById(req, res) {
// 		let fruitId = req.query.id;
// 		fruitModel
// 			.readById(fruitId)
// 			.then((fruit) => {})
// 			.catch((error) => {});
// 	}

// 	static create(options) {
// 		Fruit.insert(options);
// 	}
// }

// module.exports = FruitController;
