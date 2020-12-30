/** Constants */
import { FEED_URL, FEED_TYPES, BEARER_AUTH_TOKEN } from '../constants/index';

export async function getFeed() {
	// logs token we need to access API
	console.log(BEARER_AUTH_TOKEN);
	return fetch(FEED_URL, {
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

export async function postFeed(data) {
	return fetch(FEED_URL, {
		method: 'POST',
		headers: {
			Authorization: BEARER_AUTH_TOKEN,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
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
