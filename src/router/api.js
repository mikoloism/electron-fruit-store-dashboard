/* NOTE : endpoint of router start by "/api/*" */
const router = require('express').Router();
const Controller = require('../controller/index.js');
const { receiveImage } = require('../model/uploadImage.js');

router.get('/login', Controller.User.getIsLoggedIn);
router.post('/login', Controller.User.login);
router.delete('/login', Controller.User.logout);
router.post('/logout', Controller.User.logout);

router.get('/fruit', Controller.Fruit.read);
router.post('/fruit/image', receiveImage, Controller.Fruit.uploadImage);
router.post('/fruit/data', Controller.Fruit.create);

module.exports = router;
