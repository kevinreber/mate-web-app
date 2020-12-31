export /** Days of the week */
const DAYS = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
];

/** API Information */
const BASE_URL = 'https://api.mateapp.us/api';
export const ALL_USERS = `${BASE_URL}/api/users`;
export const BEARER_AUTH_TOKEN = localStorage.getItem('bearerAuthToken');
