/** Dependencies */
import axios from 'axios';

/** Constants */
import {
	USERS,
	FOLLOW_USER,
	UNFOLLOW_USER,
	BEARER_AUTH_TOKEN,
} from '../constants/index';

export async function getUserData(id) {
	// logs token we need to access API
	console.log(BEARER_AUTH_TOKEN);
	return axios(`${USERS}/${id}`, {
		method: 'GET',
		headers: {
			Authorization: BEARER_AUTH_TOKEN,
			'Content-Type': 'application/json',
		},
	})
		.then((data) => {
			console.log('Success:', data.data);
			return data.data;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

export async function followUser(userId) {
	const data = {
		following_id: userId,
	};
	return axios(`${FOLLOW_USER}`, {
		method: 'POST',
		headers: {
			Authorization: BEARER_AUTH_TOKEN,
			'Content-Type': 'application/json',
		},
		body: data,
	})
		.then((data) => {
			console.log('Success:', data.data);
			return data.data;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

export async function unfollowUser(userId) {
	const data = {
		following_id: userId,
	};
	return axios(`${UNFOLLOW_USER}`, {
		method: 'POST',
		headers: {
			Authorization: BEARER_AUTH_TOKEN,
			'Content-Type': 'application/json',
		},
		body: data,
	})
		.then((data) => {
			console.log('Success:', data.data);
			return data.data;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}
