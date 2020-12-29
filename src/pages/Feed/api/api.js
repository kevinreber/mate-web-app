/** Constants */
import { FEED_URL, BEARER_AUTH_TOKEN } from '../constants/index';

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
