const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const UPLOAD_PATH = path.join(__dirname, '..', '..', 'database', 'uploads');

function generateUniqueName() {
	return `${uuid.v4()}`;
}

// NOTE : req.file.buffer from uploadImage()
// NOTE : fileName generated from generateUniqueName()
// NOTE : call in uploadImage()
function saveImage(fileObject, fileName) {
	let _fName = `${fileName}${path
		.extname(fileObject.originalname)
		.toLowerCase()}`;
	let filePath = `${UPLOAD_PATH}/${_fName}`;
	return new Promise((resolve, reject) => {
		fs.rename(fileObject.path, filePath, (error) => {
			if (error) {
				reject(error);
				return;
			}
			return resolve(_fName);
		});
	});
}

const receiveImage = multer({ dest: UPLOAD_PATH }).single('uploaded-images');

module.exports.receiveImage = receiveImage;
module.exports.generateUniqueName = generateUniqueName;
module.exports.saveImage = saveImage;
