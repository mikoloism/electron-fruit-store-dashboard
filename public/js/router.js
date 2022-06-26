const page = (HTMLFile) => `./${['views', `${HTMLFile}.html`].join('/')}`;
const route = (path) => `/${path}`;

class Router {
	static ROUTERS = {
		404: page('404'),
	};

	constructor() {}

	static init(routes) {
		Object.keys(routes).forEach((key) => {
			Router.ROUTERS[`/${key}`] = routes[key];
		});
		window.onpopstate = Router.handleLocationUpdate;
		window.handleClickLink = Router.handleClickLink;
		return Router.handleLocationUpdate();
	}

	static handleClickLink(ev) {
		let event = ev || window.event;
		event.preventDefault();
		window.history.pushState({}, '', event.target.href);
		return Router.handleLocationUpdate();
	}

	static isRoute(value) {
		return !RegExp(/.html$/, 'gi').test(value);
	}

	static NormalizePath(path) {}

	static async handleLocationUpdate() {
		console.log('IM Here ');
		const currentPath = window.location.pathname;
		const currentRoute = currentPath
			? Router.ROUTERS[currentPath]
			: Router.ROUTERS[404];

		// if is redirected and path isn't file
		if (Router.isRoute(currentRoute)) {
			return window.history.pushState({}, '', currentRoute);
		}

		// if currentRoute is page view file
		const viewContent = await fetch(currentRoute)
			.then((res) => res.text())
			.catch((error) => new Error(error));
		console.log(viewContent, ' - from - ', currentRoute);
		document.querySelector('#app').innerHTML = viewContent;
	}
}

export { Router, page, route };
