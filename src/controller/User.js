const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin';

class User {
	static isLoggedIn = false;
	static setIsLoggedIn(val) {
		User.isLoggedIn = val;
		return User.isLoggedIn;
	}
	static getIsLoggedIn(req, res) {
		if (User.isLoggedIn) {
			return res.send({
				isLoggedIn: true,
				message: 'You are logged in',
				target: [],
			});
		}

		return res.send({
			isLoggedIn: false,
			message: 'You are not logged in',
			target: [],
		});
	}

	static login(req, res) {
		const { username, password } = req.body || {
			username: '',
			password: '',
		};
		if (username === DEFAULT_USERNAME) {
			if (password === DEFAULT_PASSWORD) {
				User.setIsLoggedIn(true);
				return res.send({
					isLoggedIn: true,
					message: 'You are logged in',
					target: [],
				});
			}

			// else : password is incorrect
			User.setIsLoggedIn(false);
			return res.send({
				isLoggedIn: false,
				message: 'Password is incorrect',
				target: ['password'],
			});
		}

		// else : username and password are incorrect
		User.setIsLoggedIn(false);
		return res.send({
			isLoggedIn: false,
			message: 'Username or Password is incorrect',
			target: ['username', 'password'],
		});
	}

	static logout() {
		User.setIsLoggedIn(false);
		return res.send({
			isLoggedIn: false,
			message: 'User Logged Out',
			target: [],
		});
	}
}

module.exports = User;
