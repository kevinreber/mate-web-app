import React, { useState } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import Modal from '../general/Modal';
import NoData from '../general/NoData';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoursesFromFB, addCourseToFB } from '../../store/actions/courses';
import './styles/Courses.css';

/** Displays a CourseList of user's Current and Past Semester courses. 
    Courses will fetch which courses to display from API and pass courses into CourseList.
*/
function Courses() {
	// get courses from Store
	const courses = useSelector((state) => state.courses);
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

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const addCourse = (courseData) => {
		console.log(courseData);
		dispatch(addCourseToFB(courseData));
		setShowForm(false);
	};

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
			<div className='Courses-Header d-flex justify-content-around pt-2 pb-3'>
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
			<div className='Courses-CourseList'>
				{/* <CourseList courses={courses} /> */}
				{courseList}
			</div>
			<div className='CourseForm p-3'>
				<p onClick={toggleForm} className='font-italic'>
					+ Add Class
				</p>
			</div>
		</>
	);
}

export default Courses;
