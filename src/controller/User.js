const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin';

class User {
	static username = '';
	static password = '';
	static isLoggedIn = false;
	static setIsLoggedIn(val, username = '', password = '') {
		User.username = val === true ? username : '';
		User.password = val === true ? password : '';
		User.isLoggedIn = val;
		return User.isLoggedIn;
	}
	static getIsLoggedIn(req, res) {
		return (
			res
				// .sendStatus(User.isLoggedIn ? 200 : 401)
				.send({
					status: User.isLoggedIn ? 200 : 401,
					method: 'GET',
					path: '/api/login',
					data: {
						isLoggedIn: User.isLoggedIn,
						message: User.isLoggedIn ? 'LOGGED_IN' : 'LOGGED_OUT',
					},
				})
				.end()
		);
	}

	static checkLogin(req, res, next) {
		req.auth = {
			isLoggedIn: User.isLoggedIn,
			username: User.username,
			password: User.password,
		};
		return User.isLoggedIn ? next() : res.sendStatus(401).end();
	}

	static login(req, res) {
		const { username, password } = req.body;
		const isLoggedIn =
			username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD;

		if (isLoggedIn) {
			User.setIsLoggedIn(isLoggedIn, username, password);
			return res.send({
				status: 200,
				method: 'POST',
				path: '/api/login',
				data: {
					isLoggedIn: isLoggedIn,
					message: 'LOGGED_IN',
					username: username,
					password: password,
				},
			});
		}

		return res.send({
			status: 401,
			method: 'POST',
			path: '/api/login',
			data: {
				isLoggedIn: isLoggedIn,
				message: 'LOGGED_IN_FAIL',
			},
		});
	}

	static logout() {
		User.setIsLoggedIn(false);
		return res.send({
			status: 200,
			method: req.method,
			data: {
				isLoggedIn: false,
				message: 'LOGGED_OUT_SUCCESSFUL',
			},
		});
	}
}

module.exports = User;
