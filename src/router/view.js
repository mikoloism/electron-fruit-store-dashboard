const router = require('express').Router();
const path = require('path');
// TODO const { isLoggedIn } = require('../controller');
const isLoggedIn = () => false;

// helper functions
const page = (HTMLFile) =>
	path.join(__dirname, '..', 'pages', `${HTMLFile}.html`);

// declare constant file path
const VIEW_LOGIN = page('login');
const VIEW_DASHBOARD = page('dashboard');

// view-router middleware
router.use((req, res, next) => {
	res.view = (HTMLPath) => res.sendFile(HTMLPath);
	return next();
});

router.get('/', (req, res) =>
	res.view(!isLoggedIn() ? VIEW_LOGIN : VIEW_DASHBOARD),
);
router.get('/login', (req, res) => res.view(VIEW_LOGIN));
router.get('/dashboard', (req, res) => res.view(VIEW_DASHBOARD));

module.exports = router;
