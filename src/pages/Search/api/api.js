/** Dependencies */
import axios from 'axios';

/** Constants */
import { GET, FEED_URL, BEARER_AUTH_TOKEN } from '../constants/index';

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
				return resp.data.data;
			})
			.catch((err) => {
				console.error('API Error: ', err);
				return err;
			});
	}

	static async getFeed() {
		return this.request(FEED_URL);
	}
}
