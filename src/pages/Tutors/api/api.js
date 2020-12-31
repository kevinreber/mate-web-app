/** Dependencies */
import axios from 'axios';

import { ALL_USERS, BEARER_AUTH_TOKEN } from '../api/api';

export const getAllUsersData = async () => {
	return axios(ALL_USERS, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + BEARER_AUTH_TOKEN,
			'Content-Type': 'application/json',
		},
	})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
};
