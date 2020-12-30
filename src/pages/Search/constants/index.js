export const SearchCategories = [
	'Alerts',
	'Today',
	'Networking',
	'Campus',
	'Opportunities',
	'Marketplace',
	'Events',
];

/** API Information */
const BASE_URL = 'https://api.mateapp.us/api';
export const FEED_URL = `${BASE_URL}/feeds`;
export const FEED_TYPES = `${FEED_URL}/types`;
export const BEARER_AUTH_TOKEN = localStorage.getItem('bearerAuthToken');
