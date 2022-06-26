const { Router, page, route } = require('./router.js');

const router = new Router();
window.router;

router.route('', !isLoggedIn() ? route('login') : route('dashboard'));
router.route('login', page('login'));
router.route('dashboard', page('dashboard'));
router.route('customer', page('fruit'));

window.addEventListener('DOMContentLoaded', () => {
	// router.clearRoutes()
});
