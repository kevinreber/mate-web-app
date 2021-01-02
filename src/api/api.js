import axios from 'axios';

/** Check for endpoint else use local server */
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const BEARER_AUTH_TOKEN = localStorage.getItem('bearerAuthToken');

class MateApi {
	static async request(endpoint, paramsOrData = {}, verb = 'get') {
		// paramsOrData._token = localStorage.getItem('mate-token');
		console.debug('API Call:', endpoint, paramsOrData, verb);

		try {
			return (
				await axios({
					method: verb,
					url: `${BASE_URL}/${endpoint}`,
					[verb === 'get' ? 'params' : 'data']: paramsOrData,
					headers: {
						Authorization: BEARER_AUTH_TOKEN,
						'Content-Type': 'application/json',
					},
				})
			).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	/** Verify User Login */
	static async login(data) {
		let res = await this.request('login', data, 'post');
		return res.token;
	}

	/** Get Logged in User's Data */
	static async getCurrentUserData(id) {
		let res = await this.request(`users/${id}`);
		return res.user;
	}

	/** Get array of all User's Data */
	static async getAllUsersData() {
		let res = await this.request('users');
		return res.users;
	}

	/** Get array of Feed Data */
	static async getFeed() {
		let res = await this.request('feeds');
		return res.feeds;
	}

	/** Get array of all User Classes */
	static async getUserClasses() {
		let res = await this.request('classes');
		return res.classes;
	}

	// TODO:
	// User:
	// - post: refresh token
	// - post: update profile
	// - post: update photo
	// - post: update about
	// - post: update photo
	// - post: update societies
	// - post: update achievements

	// Followers:
	// - get: followings
	// - post: follow/unfollow

	// Feeds:
	// - post: feed
	// - get: feed types

	// Study Groups:
	// - get: Study Groups List
	// - post: Create Study Group

	// Classes:
	// - get: Search courses
	// - post: Join Courses
	// - get: Class Assignments
	// - post: Add Class Assignment

	/** Update user's profile changes */
	static async saveProfile(username, data) {
		let res = await this.request(`users/${username}`, data, 'patch');
		return res.user;
	}
}

export default MateApi;
