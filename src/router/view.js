const router = require('express').Router();
const path = require('path');
const UserController = require('../controller/User.js');

// helper functions
const isLoggedIn = () => UserController.isLoggedIn;
const isLoginView = (path) => {
	const regex = new RegExp('//login', 'gi');
	return regex.test(path);
};
const checkView = (req, res, next) => {
	if (!UserController.isLoggedIn) {
		res.redirect('/view/login');
		return;
	} else {
		return next();
	}
};
const page = (HTMLFile) =>
	path.join(__dirname, '..', 'pages', `${HTMLFile}.html`);

// declare constant file path
const VIEW_LOGIN = page('login');
const VIEW_DASHBOARD = page('dashboard');
const VIEW_404 = page('404');

// view-router middleware
router.use((req, res, next) => {
	res.view = (HTMLPath) => res.sendFile(HTMLPath);
	return next();
});

// view-router endpoint
router.get('/', checkView);
router.get('/login', (req, res) => res.view(VIEW_LOGIN));
router.get('/dashboard', checkView, (req, res) => res.view(VIEW_DASHBOARD));
router.all('*', (req, res) => res.status(404).view(VIEW_404));

module.exports = router;
