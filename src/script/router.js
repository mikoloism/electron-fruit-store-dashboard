const path = require('path');

const page = (HTMLFile) => path.join(__dirname, 'pages', `${HTMLFile}.html`);
const route = (path) => window.history.pushState({}, '', `/${path}`);

class Router {
	ROUTES = {
		404: page('404'),
	};

	constructor() {
		window.onpopstate = this.handleLocationUpdate;
		window.handleClickLink = this.handleClickLink;
	}

	route(path, value) {
		return (this.ROUTES[`/${path}`] = value);
	}

	handleClickLink(ev) {
		let event = ev || window.event;
		event.preventDefault();
		window.history.pushState({}, '', event.target.href);
		return this.handleLocationUpdate();
	}

	async handleLocationUpdate() {
		const currentPath = window.location.pathname;
		const currentRoute = currentPath
			? this.ROUTES[currentPath]
			: this.ROUTES[404];

		const viewContent = await fetch(currentRoute)
			.then((res) => res.text())
			.catch((error) => new Error(error));
		document.querySelector('#app').innerHTML;
	}
}

module.exports.Router = Router;
module.exports.page = page;
module.exports.route = route;
