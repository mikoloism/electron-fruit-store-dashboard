'use strict';

// CONSTANT
const MINUTE_IN_MILLISECONDS = 60000;
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

/*
 GLOBAL MAIN RENDERER
******************************************* */
jQuery(document).ready(function ($) {
	const $dashboard = {};
	const $navigation = {
		wrapper: $('.header__navigation'),
		logo: $('.header__logo > .logo__image'),
		clock: $('.header__logo > .logo__clock'),
		navigation: $('.navigation__list'),
		items: $('.navigation__item'),
	};

	// Event Handler - dashboard
	clock($navigation.clock, null);
});

/*
 FRUIT PAGE
******************************************* */
jQuery(document).ready(function ($) {
	const $fruit = { page: $('#fruit-page') };
	$fruit.page.ready(function (ev) {
		api.get('/fruit')
			.then((res) => res.json())
			.then(({ rows }) => {
				return rows.forEach(({ id, name, quantity, image }) => {
					return $fruit.page.append(
						createFruitCard({
							fruitId: id,
							fruitName: name,
							fruitQuantity: quantity,
							fruitImage: image,
						}),
					);
				});
			})
			.then(() => {
				return $('.fruit__delete').on('click', function (ev) {
					let $this = $(this);
					let dbRowId = $this.data('db-id');
					api.remove(`/fruit?itemId=${dbRowId}`)
						.then(({ error }) => {
							if (error) {
								return console.log('[FRUIT][DELETE] : ', error);
							}
							$this.parent().parent().remove();
						})
						.catch((error) =>
							console.log('[FRUIT][DELETE] : ', error),
						);
				});
			})
			.catch((err) => console.log(`[FRUIT-GET] : ${err}`));
	});
});

/*
 CREATE FRUIT PAGE
******************************************* */
jQuery(document).ready(function ($) {
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

	// Event handlers - create-fruit
	$createFruit.page.ready(function (ev) {
		$createFruit.image.on('change', function (ev) {
			let uploadedImage = $createFruit.image.get(0).files[0];

			// to show preview
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
			let uploadedImage = $createFruit.image.get(0).files[0];
			let fruitImageName = { generatedName: '' };

			// create form data to upload image
			let formData = new FormData();
			formData.append('uploaded-images', uploadedImage);

			$.ajax({
				type: 'POST',
				url: `${BASE_API}/fruit/image`,
				processData: false,
				contentType: false,
				cache: false,
				data: formData,
				enctype: 'multipart/form',
				success: function (res) {
					$createFruit.uploadSection
						.removeClass('upload--progress')
						.addClass(`upload--${res.error ? 'error' : 'success'}`);
					fruitImageName.generatedName = res.data.fruitImageName;
					return res.data.fruitImageName;
				},
			}).then(() => {
				api.post('/fruit/data', {
					fruitName: nameValue,
					fruitCost: costValue,
					fruitQuantity: quantityValue,
					fruitImageName: fruitImageName.generatedName,
				})
					.then(() => {
						window.setTimeout(
							() => (window.location.href = '/view/product'),
							3000,
						);
					})
					.catch((error) => {
						return console.log('[FETCH][CREATE-FRUIT] : ', error);
					});
			});
		});
	});
});

/*
 LOGIN PAGE
******************************************* */
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
	// Event Handler - login
	$login.form.on('submit', (ev) => {
		ev.preventDefault();
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
				window.setTimeout(() => {
					return (window.location.href = '/view/dashboard');
				}, 2000);
				return;
			})
			.catch((err) => new Error(err));
	});
});

/*
 UTILITIES
********************************************** */
function fixPrefix(value) {
	return value < 10 ? `0${value}` : value;
}
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
function createFruitCard({ fruitId, fruitName, fruitQuantity, fruitImage }) {
	const $ = jQuery;
	const $figure = $(`
		<figure class="fruit__figure">
			<img class="fruit__image" src=${getImage(fruitImage)}
		</figure>
	`).clone(true);
	const $details = $(`
		<section class="fruit__details">
			<h3 class="fruit__title">${fruitName}</h3>
			<span class="fruit__quantity">
			موجودی : ${fruitQuantity} تن
			</span>
			<button type="button" class="fruit__delete" data-db-id="${fruitId}">
				<i class="fruit__delete__icon fa fa-trash"></i>
			</button>
			<button type="button" class="fruit__edit" data-db-id="${fruitId}">
				<i class="fruit__edit__icon fa fa-pencil"></i>
			</button>
		</section>
	`).clone(true);
	const $template = $(
		`<section class="fruit__cart" data-db-id="${fruitId}"></section>`,
	);

	$template.append($figure);
	$template.append($details);

	return $template.clone(true);
}
