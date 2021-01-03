/** Dependencies */
import axios from 'axios';

/** Constants */
import {
	GET,
	POST,
	USERS,
	FOLLOW_USER,
	UNFOLLOW_USER,
	BEARER_AUTH_TOKEN,
} from '../constants/index';

export class API {
	static async request(endpoint, req = GET, paramsOrData = {}) {
		return axios({
			method: req,
			url: endpoint,
			headers: {
				Authorization: BEARER_AUTH_TOKEN,
				'Content-Type': 'application/json',
			},
			[req === GET ? 'params' : 'data']: paramsOrData,
		})
			.then((resp) => {
				console.log('Success: ', resp.data);
				return resp.data;
			})
			.catch((err) => {
				console.error('API Error: ', err);
				return err;
			});
	}

	static async getUserData(id) {
		return this.request(`${USERS}/${id}`);
	}

	static async followUser(userId) {
		const data = {
			following_id: userId,
		};
		return this.request(FOLLOW_USER, POST, data);
	}

	static async unFollowUser(userId) {
		const data = {
			following_id: userId,
		};
		return this.request(UNFOLLOW_USER, POST, data);
	}
}
