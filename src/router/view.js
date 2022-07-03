const router = require('express').Router();
const path = require('path');
const UserController = require('../controller/User.js');

// helper functions
const isLoggedIn = () => UserController.isLoggedIn;
function checkLoggedIn(req, res, next) {
	if (!isLoggedIn()) {
		res.redirect('/view/login');
		return;
	}
	return next();
}
function page(HTMLFile) {
	return path.join(__dirname, '..', 'pages', `${HTMLFile}.html`);
}

// declare constant file path
const VIEW_LOGIN = page('login');
const VIEW_DASHBOARD = page('dashboard');
const VIEW_PRODUCT = page('product');
const VIEW_INVOICE = page('invoice');
const VIEW_SALER = page('saler');
const VIEW_CUSTOMER = page('customer');
const VIEW_PROFILE = page('profile');
const VIEW_404 = page('404');

// view-router middleware
router.use((req, res, next) => {
	res.view = (HTMLPath) => res.sendFile(HTMLPath);
	return next();
});

// view-router endpoint
router.get('/', checkLoggedIn);
router.get('/login', (req, res) => res.view(VIEW_LOGIN));
router.get('/dashboard', checkLoggedIn, (req, res) => res.view(VIEW_DASHBOARD));
router.get('/product', (req, res) => res.view(VIEW_PRODUCT));
router.get('/invoice', (req, res) => res.view(VIEW_INVOICE));
router.get('/saler', (req, res) => res.view(VIEW_SALER));
router.get('/customer', (req, res) => res.view(VIEW_CUSTOMER));
router.get('/profile', (req, res) => res.view(VIEW_PROFILE));
router.all('*', (req, res) => res.status(404).view(VIEW_404));

module.exports = router;
