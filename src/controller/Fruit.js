const FruitModel = require('../model/Fruit.js');
const { generateUniqueName, saveImage } = require('../model/uploadImage.js');

class FruitController {
	static read(req, res) {
		return FruitController.readAll(req, res);
	}

	static readAll(req, res) {
		return FruitModel.readAll()
			.then((rows) => {
				res.send({ rows });
			})
			.catch((err) => {
				console.log(`[CONTROLLER][FRUIT] : ${err}`);
			});
	}
	static readById(req, res) {}

	static uploadImage(req, res) {
		const fruitImageName = generateUniqueName();
		return saveImage(req.file, fruitImageName)
			.then((imageName) => {
				res.send({ error: false, data: { fruitImageName: imageName } });
			})
			.catch((error) => {
				res.send({ error: { from: 'saveImage', message: error } });
			});
	}

	static create(req, res) {
		const { fruitName, fruitCost, fruitQuantity, fruitImageName } =
			req.body;

		FruitModel.insert([fruitName, fruitCost, fruitQuantity, fruitImageName])
			.then(() => {
				return res.send({
					error: undefined,
					data: {
						fruitName,
						fruitCost,
						fruitQuantity,
						fruitImageName,
					},
				});
			})
			.catch((error) => {
				return res.send({
					error: { from: 'controller.fruit.create', message: error },
				});
			});
	}

	static remove(req, res) {
		let { itemId } = req.query;
		FruitModel.remove(itemId)
			.then(() => {
				return res.send({ error: undefined, data: undefined });
			})
			.catch((error) => {
				return res.send({
					error: { form: 'controller.fruit.remove', error: error },
				});
			});
	}
}

module.exports = FruitController;
