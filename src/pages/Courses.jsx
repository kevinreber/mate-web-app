/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

/** Components & Helpers */
import CourseList from '../components/Courses/CourseList';
import CourseForm from '../components/Courses/CourseForm';
import Modal from '../components/general/Modal';
import NoData from '../components/general/NoData';
import CTAButton from '../components/general/CTAButton';
import { addCourseToFB } from '../store/actions/courses';
import { fetchCourseCatalog } from '../store/actions/courseCatalog';
import db from '../config/fbConfig';
import './styles/Courses.css';

/** Displays a CourseList of user's Current and Past Semester courses. 
    Courses will fetch which courses to display from API and pass courses into CourseList.
*/
function Courses() {
	const dispatch = useDispatch();
	const [courses, setCourses] = useState([]);

	/** Current Semester courses */
	const currentCourses = courses.filter(
		(course) => course.data.semester.toLowerCase() === 'fall 2020'
	);
	/** Past Semester Courses */
	const pastCourses = courses.filter(
		(course) => course.data.semester.toLowerCase() !== 'fall 2020'
	);

	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('current');
	const toggleCourses = (e) => {
		setActive(e.target.id);
	};

	// build list of courses, if no courses exist return 'No courses added'
	const courseList =
		courses && courses.length !== 0 ? (
			<CourseList
				courses={active === 'current' ? currentCourses : pastCourses}
			/>
		) : (
			<NoData text={'courses'} />
		);

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const addCourse = (courseData) => {
		dispatch(addCourseToFB(courseData));
		setShowForm(false);
	};

	useEffect(() => {
		db.collection('class').onSnapshot((snapshot) =>
			setCourses(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
	}, []);

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
		<div className='Courses'>
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
			<div className='Courses__CourseList'>{courseList}</div>
			<div className='CourseForm p-3'>
				<p onClick={toggleForm} className='font-italic'>
					<CTAButton text='Join Class' />
				</p>
			</div>
		</div>
	);
}

export default Courses;
