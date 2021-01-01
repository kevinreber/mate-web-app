/** Initial State for Image attachments */
export const INITIAL_STATE_IMAGE = {
	attachment_preview: '',
	attachment: '',
	name: '',
	url: '',
};

/** Post Type options */
export const postTypeOptions = [
	{ id: 'e9375483-daf1-498e-8f71-501d08af7786', name: 'Networking' },
	{
		id: 'aa75bc75-9b80-4fdd-bd94-0f8840314e0c',
		name: 'Campus',
	},
	{
		id: '893e49a8-c787-49f4-a0d8-526a4b876210',
		name: 'Opportunities',
	},
	{
		id: 'dff5934c-71de-4000-9c44-823d84d48bf2',
		name: 'Marketplace',
	},
	{
		id: '9dfa5bb2-bfbd-4b8b-bb50-efe65dce98ee',
		name: 'Events',
	},
];

/** Firebase Collection constants  */
export const FB = {
	collection: 'feeds',
	orderBy: 'timestamp',
	order: 'desc',
};

/** Message types */
export const MESSAGE = {
	error: 'error',
	success: 'success',
	addPost: 'Post Successful!',
	deletePost: 'Removed Post',
	updatePost: 'Update Successful!',
};

/** Confirm Dialog prompts */
export const CONFIRM = {
	title: 'Are you sure you want to remove post?',
	subtitle: "You can't undo this operation",
};

/** API Information */
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const FEED_URL = `${BASE_URL}/feeds`;
export const FEED_TYPES = `${FEED_URL}/types`;
export const BEARER_AUTH_TOKEN = localStorage.getItem('bearerAuthToken');
