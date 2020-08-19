import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import Modal from '../general/Modal';
import NoData from '../general/NoData';
import CTAButton from '../general/CTAButton';
import { addCourseToFB } from '../../store/actions/courses';
import { firestoreConnect } from 'react-redux-firebase';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { fetchCourseCatalog } from '../../store/actions/courseCatalog';
import './styles/Courses.css';

/** Displays a CourseList of user's Current and Past Semester courses. 
    Courses will fetch which courses to display from API and pass courses into CourseList.
*/
function Courses({ courses }) {
	const dispatch = useDispatch();

	// build list of courses, if no courses exist return 'No courses added'
	const courseList =
		courses && courses.length !== 0 ? (
			<CourseList courses={courses} />
		) : (
			<NoData text={'courses'} />
		);

	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('current');
	const toggleCourses = (e) => {
		setActive(e.target.id);
	};

	// const [courseCatalog, setCourseCatalog] = useState({});

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const addCourse = (courseData) => {
		console.log(courseData);
		dispatch(addCourseToFB(courseData));
		setShowForm(false);
	};

	useEffect(() => {
		/** get course catalog on page load */
		async function getCourseCatalog() {
			await dispatch(fetchCourseCatalog());
		}
		getCourseCatalog();
	}, [dispatch]);

	if (showForm) {
		return (
			<Modal
				content={<CourseForm save={addCourse} />}
				closeModal={toggleForm}
			/>
		);
	}

	return (
		<>
			<div className='Courses-Header Body-Header'>
				<div className='Courses-Current'>
					<h5
						id='current'
						className={
							active === 'current' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleCourses}>
						Current Semester
					</h5>
				</div>
				<div className='Courses-Past'>
					<h5
						id='past'
						className={
							active === 'past' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleCourses}>
						Past Semester
					</h5>
				</div>
			</div>
			<div className='Courses-CourseList'>{courseList}</div>
			<div className='CourseForm p-3'>
				<p onClick={toggleForm} className='font-italic'>
					<CTAButton text='Join Class' />
				</p>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		courses: state.firestore.ordered.class,
	};
};

/** connect to FB collection */
export default compose(
	connect(mapStateToProps),
	firestoreConnect((ownProps) => [
		{
			collection: 'class',
			orderBy: ['department'],
		},
	])
)(Courses);
