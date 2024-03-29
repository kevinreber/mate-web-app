import {
	FETCH_COURSES,
	FETCH_COURSE,
	ADD_COURSE,
	REMOVE_COURSE,
	ADD_ASSIGNMENT,
} from '../actions/types';

// const INITIAL_STATE = [
// 	{
// 		id: 'CS61a',
// 		semester: 'FALL 2020',
// 		description: 'This is a course',
// 		assignments: [
// 			{
// 				id: 1,
// 				title: 'HW 01: Variables & Functions',
// 				dueDate: 'Today @4pm',
// 				classGrade: 76,
// 				userGrade: 80,
// 				submitStatus: true,
// 				classSubmittals: 10,
// 			},
// 			{
// 				id: 2,
// 				title: 'HW 02: Data Abstraction',
// 				dueDate: 'Tomorrow @7pm',
// 				classGrade: 76,
// 				userGrade: 80,
// 				submitStatus: true,
// 				classSubmittals: 10,
// 			},
// 			{
// 				id: 3,
// 				title: 'Project: Hog',
// 				dueDate: 'July 25,2020 @4pm',
// 				classGrade: 76,
// 				userGrade: null,
// 				submitStatus: true,
// 				classSubmittals: 10,
// 			},
// 			{
// 				id: 4,
// 				title: 'HW 02: High-Order functions',
// 				dueDate: 'Aug. 2,2020 @2:30pm',
// 				classGrade: 76,
// 				userGrade: 80,
// 				submitStatus: true,
// 				classSubmittals: 10,
// 			},
// 		],
// 	},
// 	{ id: 'CS61b', semester: 'FALL 2020', description: 'This is a course' },
// 	{ id: 'CS61c', semester: 'FALL 2020', description: 'This is a course' },
// 	{ id: 'MATH1a', semester: 'FALL 2020', description: 'This is a course' },
// 	{ id: 'MATH1b', semester: 'FALL 2020', description: 'This is a course' },
// ];

const courseReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_COURSES:
			// return console.log('fetching courses');
			console.log('getting ', action.courses);
			return state;
		case FETCH_COURSE:
			// return console.log('fetching courses');
			console.log('got ', action.course);
			return state;
		case ADD_COURSE:
			console.log('created', action.course);
			// return [...state, action.course];
			return state;
		case 'ADD_COURSE_ERROR':
			console.log('add course error', action.error);
			return state;
		case REMOVE_COURSE:
			return console.log('removing course');
		case ADD_ASSIGNMENT:
			return console.log('adding assignment');
		default:
			return state;
	}
};

export default courseReducer;
