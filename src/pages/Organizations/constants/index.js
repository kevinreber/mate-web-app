export const CONFIRM_DIALOG_INITIAL_STATE = {
	isOpen: false,
	title: '',
	subtitle: '',
};

// Form Data
export const COURSE_FORM_DATA_INITIAL_STATE = {
	courseName: '',
	courseSemester: '',
	courseYear: '',
	courseId: null,
};

// Form Data
export const COMMUNITY_FORM_DATA_INITIAL_STATE = {
	name: '',
	semester: '',
	year: '',
	id: null,
};

//  Constant Variables
export const COMMUNITIES = 'communities';
export const COURSES = 'courses';
export const CURRENT = 'current';
export const PAST = 'past';
export const CURRENT_SEMESTER = 'fall 2020';

/** Firebase Collection constants  */
export const FB = {
	collection: 'class',
	field: 'users',
	filter: 'array-contains',
};

/** Message types */
export const MESSAGE = {
	error: 'error',
	success: 'success',
	addCourse: 'Course Added',
};

/** Semester Options */
export const SEMESTERS = ['Fall', 'Spring', 'Summer'];

/** Year Options */
export const YEARS = ['2021', '2020', '2019', '2018', '2017', '2016'];
