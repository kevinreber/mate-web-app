const BASE_URL = 'https://api.mateapp.us';

const data = {
	access_token: '1234567',
	email: 'kevinreber@berkeley.edu',
};

export const LOGIN_URL = `${BASE_URL}/api/login`;
export const USER_PROFILE_URL = `${BASE_URL}/api/me`;
export const USER_PHOTO = `${USER_PROFILE_URL}/photo`;
export const USER_ABOUT = `${USER_PROFILE_URL}/about`;
export const USER_SOCIETIES = `${USER_PROFILE_URL}/societies`;
export const USER_ACHIEVEMENTS = `${USER_PROFILE_URL}/achievements`;

export const FEED_URL = `${BASE_URL}/api/feeds`;
export const FEED_TYPES = `${FEED_URL}/types`;

export const STUDY_GROUPS = `${BASE_URL}/study-groups`;
export const USERS = `${BASE_URL}/users`;

export const CLASSES = `${BASE_URL}/classes`;
export const USER_CLASSES = `${BASE_URL}/me/classes`;

export const FOLLOW_USER = `${BASE_URL}/follow`;
export const UNFOLLOW_USER = `${BASE_URL}/unfollow`;

export const BEARER = 'Bearer ';
/* fetch(LOGIN_URL, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
}); */

export const BEARER_AUTH_TOKEN = localStorage.getItem('bearerAuthToken');

//  ! EXAMPLE REFERENCE BELOW - DO NOT USE
// fetch(USER_PROFILE_URL, {
// 	method: 'GET',
// 	headers: {
// 		Authorization: bearer,
// 		'Content-Type': 'application/json',
// 	},
// })
// 	.then((response) => response.json())
// 	.then((data) => {
// 		console.log('Success:', data.data.user);
// 	})
// 	.catch((error) => {
// 		console.error('Error:', error);
// 	});
