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

function fixPrefix(value) {
	return value < 10 ? `0${value}` : value;
}
const MINUTE_IN_MILLISECONDS = 60000;
function clock($this, timeOut = null) {
	// NOTE : remove loop of setTimeout and re-rendering twice
	if (timeOut !== null) {
		window.clearTimeout(timeOut);
	}

	let date = new Date();
	let [hour, minute] = [date.getHours(), date.getMinutes()];
	let currentTime = `${fixPrefix(hour)} : ${fixPrefix(minute)}`;
	$this.html(currentTime);
	$this.attr('title', currentTime);

	// to re-rendering the clock() to update the time
	timeOut = window.setTimeout(
		() => clock($this, timeOut),
		MINUTE_IN_MILLISECONDS,
	);
	return;
}

function getImage(fileName) {
	return `http://localhost:3000/static/uploads/${fileName}`;
}

jQuery(document).ready(function ($) {
	// authorization global state
	const auth = {
		username: undefined,
		password: undefined,
	};

	// Selector - login
	const $login = {
		form: $('#login-form'),
		button: $('#login-button'),
		username: $('#login-username'),
		password: $('#login-password'),
	};

	// Selector - dashboard
	const $dashboard = {};
	const $navigation = {
		wrapper: $('.header__navigation'),
		logo: $('.header__logo > .logo__image'),
		clock: $('.header__logo > .logo__clock'),
		navigation: $('.navigation__list'),
		items: $('.navigation__item'),
	};
	const $createFruit = {
		page: $('#create-fruit-page'),
		form: $('#fruit-form'),
		name: $('#fruit-form-title'),
		cost: $('#fruit-form-cost'),
		quantity: $('#fruit-form-quantity'),
		image: $('#fruit-form-image'),
		submit: $('#fruit-form-submit'),
		uploadSection: $('#fruit-form .upload'),
		preview: $('#fruit-form-preview'),
	};
	const $fruit = { page: $('#fruit-page') };

	// Event handlers - create-fruit
	$createFruit.image.on('change', function (ev) {
		let uploadedImage = $createFruit.image.get(0).files[0];
		let uploadedImageURL = URL.createObjectURL(uploadedImage);
		$createFruit.uploadSection
			.removeClass('upload--upload')
			.addClass('upload--progress');
		$createFruit.preview.attr('src', uploadedImageURL);
	});

	$createFruit.form.on('submit', function (ev) {
		ev.preventDefault();
		let $cf = $createFruit;
		let nameValue = $cf.name.val();
		let costValue = $cf.cost.val();
		let quantityValue = $cf.quantity.val();
		let uploadedImage = $cf.image.get(0).files[0];
		let formData = new FormData();
		formData.append('fruitName', nameValue);
		formData.append('fruitCost', costValue);
		formData.append('fruitQuantity', quantityValue);
		formData.append('uploaded-images', uploadedImage);
		formData.forEach((item, key) => {
			console.log(`form-data : `, { key, item });
		});

		$.ajax({
			method: 'POST',
			url: `${BASE_API}/fruit`,
			processData: false,
			contentType: false,
			cache: false,
			data: formData,
			enctype: 'multipart/form',
			success: function (res) {
				$createFruit.uploadSection
					.removeClass('upload--progress')
					.addClass('upload--success');
				// return window.setTimeout(
				// 	() => (window.location.href = '/view/product'),
				// 	2000,
				// );
			},
		});
	});

	$fruit.page.ready(function (ev) {
		api.get('/fruit')
			.then((res) => res.json())
			.then(({ rows }) => {
				return console.log(`[DATA] : `, rows);
			})
			.catch((err) => console.log(`[FRUIT-GET] : ${err}`));
	});

	// Event Handler - dashboard
	clock($navigation.clock, null);

	// Event Handler - login
	$login.button.on('click', (ev) => {
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
