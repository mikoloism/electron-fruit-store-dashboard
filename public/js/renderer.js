import axios from 'axios';
import $ from 'jquery';

// api constant and method
const api = axios.create({});

// login page selectors
const $login = {
	button: $('#login-button'),
	username: $('#login-username'),
	password: $('#login-password'),
};

// dashboard page selectors
const $dashboard = {};

(function () {
	$login.button.on('click', () => {
		api.post('/login', {
			username: $login.username.val(),
			password: $login.password.val(),
		});
	});
})();
