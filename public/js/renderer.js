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
	const $navigation = {
		wrapper: $('.header__navigation'),
		logo: $('.header__logo > .logo__image'),
		clock: $('.header__logo > .logo__clock'),
		navigation: $('.navigation__list'),
		items: $('.navigation__item'),
	};
	const $dashboard = { page: $('#dashboard-page') };

	// Event Handler - dashboard
	clock($navigation.clock, null);
});

/*
 CUSTOMER PAGE
******************************************* */
jQuery(document).ready(function ($) {
	const $customer = { page: $('#customer-page') };
	const FAKE_DB = [
		{
			id: 1,
			name: 'محمد رحیمی',
			date: '۱۱ خرداد ۱۴۰۱',
			image: 'customer-01.png',
		},
		{
			id: 2,
			name: 'مراد کاظمی',
			date: '۱۰ خرداد ۱۴۰۱',
			image: 'customer-02.png',
		},
		{
			id: 3,
			name: 'محسن کوهی',
			date: '۰۹ خرداد ۱۴۰۱',
			image: 'customer-03.png',
		},
		{
			id: 4,
			name: 'رضا صادقی',
			date: '۱۲ مرداد ۱۴۰۱',
			image: 'customer-04.png',
		},
		{
			id: 5,
			name: 'محسن هاشمی',
			date: '۱۵ خرداد ۱۴۰۱',
			image: 'customer-05.png',
		},
		{
			id: 6,
			name: 'امین وفایی',
			date: '۲۵ خرداد ۱۴۰۱',
			image: 'customer-06.png',
		},
		{
			id: 7,
			name: 'رضا گوهری',
			date: '۲۵ خرداد ۱۴۰۱',
			image: 'customer-07.png',
		},
		{
			id: 8,
			name: 'حسین خلج زاده',
			date: '۲۵ خرداد ۱۴۰۱',
			image: 'customer-08.png',
		},
		{
			id: 9,
			name: 'علی موسوی',
			date: '۲۵ خرداد ۱۴۰۱',
			image: 'customer-09.png',
		},
	];

	$customer.page.ready(() => {
		return FAKE_DB.map(({ id, name, date, image }) => {
			return $customer.page.append(
				$CartComponent({
					id,
					name,
					description: `تاریخ ورود : ${date}`,
					image,
				}),
			);
		});
	});
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
						$CartComponent(
							{
								id,
								name,
								description: `موجودی : ${quantity} تن`,
								image,
							},
							true,
						),
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

function $CartComponent({ id, name, description, image }, hasButton = false) {
	const $ = jQuery;
	const $figure = $(`
	<figure class="cart__figure">
		<img class="cart__image" src=${getImage(image)}
	</figure>
`).clone(true);
	const $details = $(`
	<section class="cart__details">
		<h3 class="cart__title">${name}</h3>
		<span class="cart__description">${description}</span>
		${
			hasButton
				? `
				<button type="button" class="cart__delete" data-db-id="${id}">
					<i class="cart__delete__icon fa fa-trash"></i>
				</button>
				<button type="button" class="cart__edit" data-db-id="${id}">
					<i class="cart__edit__icon fa fa-pencil"></i>
				</button>`
				: ``
		}
	</section>
`).clone(true);
	const $template = $(`<section class="cart" data-db-id="${id}"></section>`);

	$template.append($figure);
	$template.append($details);

	return $template.clone(true);
}
