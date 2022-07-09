const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const uuid = require('uuid');

const UPLOAD_PATH = path.join(__dirname, 'database', 'uploads');

function generateUniqueName() {
	return `${uuid.v4()}.jpeg`;
}

// NOTE : req.file.buffer from uploadImage()
// NOTE : fileName generated from generateUniqueName()
// NOTE : call in uploadImage()
function saveImage(fileBuffer, fileName) {
	return sharp(fileBuffer)
		.jpeg({ quality: 40 })
		.toFile(`${UPLOAD_PATH}/${fileName}`);
}

const Storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './../../database/uploads');
	},
	filename: function (req, file, callback) {
		callback(null, generateUniqueName());
	},
});

const uploadImage = multer({ storage: Storage }).single('uploaded-images');

module.exports.uploadImage = uploadImage;
module.exports.generateUniqueName = generateUniqueName;
module.exports.saveImage = saveImage;
