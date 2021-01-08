/** Dependencies */
import axios from 'axios';

/** Constants */
import {
	GET,
	POST,
	USERS,
	FOLLOW_USER,
	UNFOLLOW_USER,
	UPDATE_PROFILE,
	UPDATE_PHOTO,
	UPDATE_ABOUT,
	UPDATE_SOCIETIES,
	UPDATE_ACHIEVEMENTS,
	BEARER,
	BEARER_AUTH_TOKEN,
} from '../constants/index';

export class API {
	static async request(endpoint, req = GET, paramsOrData = {}) {
		return axios({
			method: req,
			url: endpoint,
			headers: {
				Authorization: BEARER + localStorage.getItem(BEARER_AUTH_TOKEN),
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

	/**
	 * @param {string} data.first_name
	 * @param {string} data.last_name
	 * @param {string} data.display_name
	 * @param {number} data.phone_number
	 */
	static async updateProfile(data) {
		return this.request(UPDATE_PROFILE, POST, data);
	}

	static async updatePhoto(data) {
		return this.request(UPDATE_PHOTO, POST, data);
	}

	/**
	 * @param {string} data.about
	 */
	static async updateAbout(data) {
		return this.request(UPDATE_ABOUT, POST, data);
	}

	/**
	 * @param {string} data.societies	String of societies separated by commas.
	 */
	static async updateSocieties(data) {
		return this.request(UPDATE_SOCIETIES, POST, data);
	}
	/**
	 * @param {string} data.achievements	String of achievements separated by commas.
	 */
	static async updateAchievements(data) {
		return this.request(UPDATE_ACHIEVEMENTS, POST, data);
	}
}
