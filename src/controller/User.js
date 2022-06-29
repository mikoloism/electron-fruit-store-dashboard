const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin';

class User {
	static isLoggedIn = false;
	static setIsLoggedIn(val) {
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

	static login(req, res) {
		const { username, password } = req.body;
		const checkLogin = () =>
			username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD;
		const currentState = checkLogin();
		User.setIsLoggedIn(currentState);
		return (
			res
				// .sendStatus(currentState ? 200 : 401)
				.send({
					status: currentState ? 200 : 401,
					method: 'POST',
					path: '/api/login',
					data: {
						isLoggedIn: currentState,
						message: currentState ? 'LOGGED_IN' : 'LOGGED_IN_FAIL',
						username,
						password,
					},
				})
				.end()
		);
	}

	static logout() {
		User.setIsLoggedIn(false);
		return res
			.send({
				status: 200,
				method: req.method,
				data: {
					isLoggedIn: false,
					message: 'LOGGED_OUT_SUCCESSFUL',
				},
			})
			.end();
	}
}

module.exports = User;
