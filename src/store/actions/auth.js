/** Dependencies */
import axios from 'axios';

/** Helpers */
import { auth, provider } from '../../config/fbConfig';
import createFbTimestamp from '../../utils/createFbTimestamp';
import { isMobile } from 'react-device-detect';
import db from '../../config/fbConfig';

// import firebase from 'firebase/app';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

/** Types */
import {
	SET_CURRENT_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
	LOGOUT_FAIL,
} from './types';

/** Constants */
import {
	LOGIN_URL,
	USER_PROFILE_URL,
	USER_PHOTO,
	BEARER,
	BEARER_AUTH_TOKEN,
} from '../constants/index';

/** Checks if user is already in DB
 *  if user is in DB, last log in will be updated
 *  else user will be added to DB
 *
 *  @param {string}
 */
async function checkIfUserExists(user) {
	const userRef = db.collection('users').doc(user.uid);

	await userRef
		.get()
		.then(async (doc) => {
			if (doc.exists) {
				updateUserLogin(user);
			} else {
				addNewUserToDB(user);
			}
		})
		.catch((err) => console.log(err));
}

/** Adds new User to DB
 *  @param {Object} user
 */
async function addNewUserToDB(user) {
	const data = {
		uid: user.uid,
		displayName: user.displayName,
		name: {
			first: '',
			last: '',
		},
		bio: '',
		classes: [],
		email: user.email,
		isTutor: false,
		organizations: [],
		phoneNumber: user.phoneNumber,
		photoURL: user.photoURL,
		backgroundImage: '',
		social: {
			linkedin: '',
			github: '',
			portfolio: '',
		},
		school: 'U.C. Berkeley',
		portfolio: [],
		keywords: [],
		createdAt: createFbTimestamp(),
		lastLoginAt: createFbTimestamp(),
		lastUpdatedAt: createFbTimestamp(),
	};

	const days = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday',
	];

	await db.collection('users').doc(user.uid).set(data);

	// set availability
	days.forEach(async (day, idx) => {
		await db
			.collection('users')
			.doc(user.uid)
			.collection('availability')
			.doc(day)
			.set({
				0: {
					start: null,
					end: null,
					idx: 0,
				},
				day: idx + 1,
			});
	});

	await updateProfile(user, user.photoURL);

	console.log('New user created', data);
}

async function updateProfile(user, photo) {
	await axios
		.all([
			axios(USER_PROFILE_URL, {
				method: 'POST',
				headers: {
					Authorization: BEARER + BEARER_AUTH_TOKEN,
					'Content-Type': 'application/json',
				},
				body: {
					first_name: user.first_name,
					last_name: user.last_name,
					display_name: user.displayName,
					phone_number: user.phoneNumber,
				},
			}),
			axios(USER_PHOTO, {
				method: 'POST',
				headers: {
					Authorization: BEARER + BEARER_AUTH_TOKEN,
					'Content-Type': 'application/json',
				},
				body: {
					photo: photo,
				},
			}),
		])
		.then((data1, data2) => {
			console.log('Success:', data1.data);
			console.log('Success:', data2.data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

async function updateUserLogin(user) {
	console.log('updating user last login...');
	await db
		.collection('users')
		.doc(user.uid)
		.update({ lastLoginAt: createFbTimestamp() });
}

export function googleLogin() {
	if (isMobile) {
		return (dispatch) => {
			auth
				.setPersistence(firebase.auth.Auth.Persistence.SESSION)
				.then(() => {
					auth.signInWithRedirect(provider).then(async (result) => {
						// Check if user exists - account will be made for new users.
						await checkIfUserExists(result.user);
						console.log(result.credential, result.user);
						const token = result.credential.accessToken;
						const data = {
							access_token: token,
							email: result.user.email,
						};
						const auth = await fetch(LOGIN_URL, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(data),
						}).then((response) => response.json());

						const accessToken = auth.data.access_token;
						const userData = auth.data.user;
						/** Store Bearer token that will be used as an access token to fetch data from our API */
						localStorage.setItem('bearerAuthToken', accessToken);

						// log data received from API
						console.log(userData, accessToken);

						db.collection('users')
							.doc(result.user.uid)
							.get()
							.then((doc) => {
								return dispatch(setCurrUser(doc.data()));
							});
					});
				})
				.catch((err) => dispatch(dispatchError(LOGIN_FAIL, err)));
		};
	} else {
		return (dispatch) => {
			auth
				.setPersistence(firebase.auth.Auth.Persistence.SESSION)
				.then(() => {
					auth.signInWithPopup(provider).then(async (result) => {
						console.log(result.credential, result.user);
						const token = result.credential.accessToken;
						const data = {
							access_token: token,
							email: result.user.email,
						};
						const auth = await fetch(LOGIN_URL, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(data),
						})
							.then((response) => response.json())
							.catch((err) => console.error(err));

						const accessToken = auth.data.access_token;
						const userData = auth.data.user;
						/** Store Bearer token that will be used as an access token to fetch data from our API */
						localStorage.setItem('bearerAuthToken', accessToken);

						// log data received from API
						console.log(userData, accessToken);

						// Check if user exists - account will be made for new users.
						await checkIfUserExists(result.user);
						// ! SETTING USER USING DATA FROM NEW API
						return dispatch(setCurrentUser(userData));

						// ! SETTING USER USING DATA FROM FIREBASE DB
						// db.collection('users')
						// 	.doc(result.user.uid)
						// 	.get()
						// 	.then((doc) => {
						// 		return dispatch(setCurrUser(doc.data()));
						// 	});
					});
				})
				.catch((err) => dispatch(dispatchError(LOGIN_FAIL, err)));
		};
	}
}

export function setCurrentUser(user) {
	return (dispatch) => {
		dispatch(setCurrUser(user));
		// ! SETTING USER USING DATA FROM FIREBASE DB
		// db.collection('users')
		// 	.doc(user.uid)
		// 	.get()
		// 	.then((doc) => {
		// 		dispatch(setCurrUser(doc.data()));
		// 	});
	};
}

/** Formats action data to input to dispatch */
export function setCurrUser(user) {
	return {
		type: SET_CURRENT_USER,
		user,
	};
}

export function logOut() {
	return (dispatch) => {
		// auth
		// 	.signOut()
		// .then(() => {
		localStorage.removeItem('bearerAuthToken');
		console.log('Sign out successful');
		dispatch(logOutUser(LOGOUT_USER));
		// })
		// .catch((err) => dispatch(dispatchError(LOGOUT_FAIL, err)));
	};
}

function logOutUser(user = null) {
	return {
		type: LOGOUT_USER,
		user,
	};
}

export function deleteAccount(id) {
	return (dispatch) => {
		db.collection('users')
			.doc(id)
			.delete()
			.then(() => {
				console.log('Account successfully deleted!');
				logOut();
			})
			.catch((err) => {
				console.error('Error removing account: ', err);
			});
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}
