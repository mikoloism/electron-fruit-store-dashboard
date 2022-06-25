// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const nativePath = require('path');
const { isLoggedIn } = require('../model/database.js');

const path = (HTMLFile) =>
	nativePath.join(__dirname, 'pages', `${HTMLFile}.html`);

const ROUTERS = {
	'/': isLoggedIn() ? path('dashboard') : path('login'),
	'/login': path('login'),
};

function route(ev) {
	let event = ev || window.event;
	event.preventDefault();
	window.history.pushState({}, '', event.target.href);
	handleLocationUpdate();
}

async function handleLocationUpdate() {
	const currentPath = window.location.pathname;
	const currentRoute = currentPath ? ROUTERS[currentPath] : ROUTERS[404];
	const viewContent = await fetch(currentRoute)
		.then((res) => res.text())
		.catch((err) => new Error(err));
	document.querySelector('#app').innerHTML = viewContent;
}

window.addEventListener('DOMContentLoaded', () => {
	// code
});
