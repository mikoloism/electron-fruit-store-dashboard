'use strict';

// api constant and method
const BASE_API = `http://localhost:3000/api`;
const api = {
	post(endpoint, body) {
		return fetch(`${BASE_API}${endpoint}`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		});
	},
	get(endpoint) {
		return fetch(`${BASE_API}${endpoint}`);
	},
	put(endpoint, body) {
		return fetch(`${BASE_API}${endpoint}`, {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		});
	},
	remove(endpoint) {
		return fetch(`${BASE_API}${endpoint}`, { method: 'DELETE' });
	},
};

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
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	});
});
