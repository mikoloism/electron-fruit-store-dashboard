import { Router, route, page } from './router.js';

const isLoggedIn = () => false;

const routes = {
	'': !isLoggedIn() ? route('login') : route('dashboard'),
	login: page('login'),
	dashboard: page('dashboard'),
	customer: page('customer'),
};

window.addEventListener('DOMContentLoaded', function () {
	Router.init(routes);
});
