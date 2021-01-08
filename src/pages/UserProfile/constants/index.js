/** Firebase Collection constants  */
export const FB = {
	users: 'users',
	availability: 'availability',
	class: 'class',
	feeds: 'feeds',
	day: 'day',
};

/** Message types */
export const MESSAGE = {
	error: 'error',
	success: 'success',
	sendMessage: 'Message user?',
	sentMessage: 'Message Created!',
	deleteAccount: 'Account Deleted',
	updateAccount: 'Changes Saved!',
	noUser: 'User does not exist',
};

/** Confirm Dialog prompts */
export const CONFIRM = {
	title: 'Delete account?',
	subtitle: "You can't undo this operation",
};

/** API Information */
const BASE_URL = process.env.REACT_APP_BASE_URL || null;
export const GET = 'GET';
export const POST = 'POST';
export const USERS = `${BASE_URL}/users`;
export const FOLLOWINGS = `${BASE_URL}/following`;
export const FOLLOWERS = `${BASE_URL}/followers`;
export const FOLLOW_USER = `${BASE_URL}/follow`;
export const UNFOLLOW_USER = `${BASE_URL}/unfollow`;

export const UPDATE_PROFILE = `${BASE_URL}/me`;
export const UPDATE_PHOTO = `${UPDATE_PROFILE}/photo`;
export const UPDATE_ABOUT = `${UPDATE_PROFILE}/about`;
export const UPDATE_SOCIETIES = `${UPDATE_PROFILE}/societies`;
export const UPDATE_ACHIEVEMENTS = `${UPDATE_PROFILE}/achievements`;

export const BEARER = 'BEARER ';
export const BEARER_AUTH_TOKEN = 'bearerAuthToken';
