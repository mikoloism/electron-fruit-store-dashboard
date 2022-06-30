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

jQuery(document).ready(function ($) {
	// authorization global state
	const auth = {
		username: undefined,
		password: undefined,
	};

	// login page selectors
	const $login = {
		form: $('#login-form'),
		button: $('#login-button'),
		username: $('#login-username'),
		password: $('#login-password'),
	};

	// dashboard page selectors
	const $dashboard = {};

	$login.form.on('submit', (ev) => {
		e.preventDefault();
	});
	$login.button.on('click', async (ev) => {
		let $form = $login.form;
		api.post('/login', {
			username: $login.username.val(),
			password: $login.password.val(),
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.data.isLoggedIn) {
					$form.hasClass('login--success') &&
						$form.removeClass('login--success');
					return $form.addClass('login--error');
				}

				$form.hasClass('login--error') &&
					$form.removeClass('login--error');
				$form.addClass('login--success');
				auth.username = data.data.username;
				auth.password = data.data.password;
				window.location.href = '/view/dashboard';
				return;
			})
			.catch((err) => new Error(err));
	});
});
