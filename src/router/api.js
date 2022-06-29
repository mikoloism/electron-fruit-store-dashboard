/* NOTE : endpoint of router start by "/api/*" */
const router = require('express').Router();
const Controller = require('../controller/index.js');

router.get('/login', Controller.User.getIsLoggedIn);
router.post('/login', Controller.User.login);
router.delete('/login', Controller.User.logout);
router.post('/logout', Controller.User.logout);

// TODO : router.get('/fruit', Controller.User.checkLogin, Controller.Fruit.read);

module.exports = router;
