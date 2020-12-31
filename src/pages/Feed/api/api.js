/** Dependencies */
import axios from 'axios';

/** Constants */
import { FEED_URL, FEED_TYPES, BEARER_AUTH_TOKEN } from '../constants/index';

export async function getFeed() {
	// logs token we need to access API
	console.log(BEARER_AUTH_TOKEN);
	return axios(FEED_URL, {
		method: 'GET',
		headers: {
			Authorization: BEARER_AUTH_TOKEN,
			'Content-Type': 'application/json',
		},
	})
		.then((data) => {
			console.log('Success:', data.data);
			return data.data.data;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

export async function postFeed(data) {
	console.log(data);
	return axios(FEED_URL, {
		method: 'POST',
		headers: {
			Authorization: BEARER_AUTH_TOKEN,
		},
		data,
	})
		.then((data) => {
			console.log('Success:', data.data);
			return data.data;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

export async function getFeedTypes() {
	return fetch(FEED_TYPES, {
		method: 'GET',
		headers: {
			Authorization: BEARER_AUTH_TOKEN,
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Success:', data.data);
			return data.data;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}
