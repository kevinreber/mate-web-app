/** Dependencies */
import axios from 'axios';

/** Constants */
import {
	GET,
	POST,
	STUDY_GROUPS,
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

	static async getAllStudyGroups() {
		return this.request(STUDY_GROUPS);
	}

	static async createStudyGroup(data) {
		return this.request(STUDY_GROUPS, POST, data);
	}
}
