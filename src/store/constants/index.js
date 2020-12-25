const BASE_URL = 'https://api.mateapp.us';

const data = {
	access_token: '1234567',
	email: 'kevinreber@berkeley.edu',
};

export const LOGIN_URL = `${BASE_URL}/api/login`;
export const USER_PROFILE_URL = `${BASE_URL}/api/me`;
export const FEED_URL = `${BASE_URL}/api/feeds`;

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

const bearer =
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLm1hdGVhcHAudXNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MDg4NTUzMjYsImV4cCI6MTYwOTExNDUyNiwibmJmIjoxNjA4ODU1MzI2LCJqdGkiOiJyTjMzS3ZjakpWTmxDd1NRIiwic3ViIjoiNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1dWlkIjoiMDc3MTQwMWQtZjZhMi00YzFhLTg5NjUtODFiODg5OTU5NDM3In0.bc7PKIvUTR-2M1qGFgvjJUJp2wbklkJJI2CWqLmiTJY';

fetch(USER_PROFILE_URL, {
	method: 'GET',
	headers: {
		Authorization: bearer,
		'Content-Type': 'application/json',
	},
})
	.then((response) => response.json())
	.then((data) => {
		console.log('Success:', data.data.user);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
