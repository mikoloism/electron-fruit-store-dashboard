const FruitModel = require('../model/Fruit.js');
const {
	uploadImage,
	generateUniqueName,
	saveImage,
} = require('../model/uploadImage.js');

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

class FruitController {
	static create(req, res) {
		const { fruitName, fruitCost, fruitQuantity } = req.body;
		const fruitImageName = generateUniqueName();

		return uploadImage(req, res, function (err) {
			if (err) {
				return res.end('Error uploading file.');
			}

			return saveImage(req.file.buffer, fruitImageName)
				.then(() => {
					FruitModel.insert([
						fruitName,
						fruitCost,
						fruitQuantity,
						fruitImageName,
					])
						.then(() => {
							return res.end({ success: true });
						})
						.catch((err) => {
							return res.send(err);
						});
				})
				.catch((err) => {
					return res.send(err);
				});
		});
	}
}

module.exports = FruitController;
