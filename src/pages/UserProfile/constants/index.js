/** Initial State for Image attachments */
export const INITIAL_STATE_IMAGE = {
	attachment_preview: '',
	attachment: '',
	name: '',
	url: '',
};

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
