'use strict';

import * as $ from '../../static/js/jquery/dist/jquery.min.js';

(function () {
	// api constant and method
	const BASE_API = `http://localhost:3000/api`;
	const api = (url) => `${BASE_API}${url}`;

	// authorization global state
	const auth = {
		username: undefined,
		password: undefined,
	};

	// login page selectors
	const $login = {
		button: $('#login-button'),
		username: $('#login-username'),
		password: $('#login-password'),
	};

	// dashboard page selectors
	const $dashboard = {};

	$login.button.on('click', () => {
		console.log('clicked');
		fetch(api('/login'), {
			method: 'POST',
			body: {
				username: $login.username.val(),
				password: $login.password.val(),
			},
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	});
})();
