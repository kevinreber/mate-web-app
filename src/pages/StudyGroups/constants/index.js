/** Firebase Collection constants  */
export const FB = {
	collection: 'study-group',
};

/** Message types */
export const MESSAGE = {
	error: 'error',
	success: 'success',
	studyGroupCreated: 'Study Group Created!',
};

/** API Information */
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const GET = 'GET';
export const POST = 'POST';
export const STUDY_GROUPS = `${BASE_URL}/study-groups`;
export const BEARER = 'Bearer ';
export const BEARER_AUTH_TOKEN = 'bearerAuthToken';
