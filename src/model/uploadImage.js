const multer = require('multer');

const Storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now());
	},
});

const uploadImage = multer({ storage: Storage }).single('userPhoto');

module.exports = uploadImage;
