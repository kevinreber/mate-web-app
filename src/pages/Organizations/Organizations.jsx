/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import CourseList from './components/CourseList/CourseList';
import CourseForm from './components/CourseForm/CourseForm';
import CommunityList from './components/CommunityList/CommunityList';
import CommunityForm from './components/CommunityForm/CommunityForm';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/layout/Loader/Loader';
import CTAButton from '../../components/CTAButton/CTAButton';
import { addCourseToFB } from '../../store/actions/courses';
import { fetchCourseCatalog } from '../../store/actions/courseCatalog';
import { addFlashMessage } from '../../store/actions/flashMessages';
import db from '../../config/fbConfig';
import './Organizations.css';
import {
	CONFIRM_DIALOG_INITIAL_STATE,
	FB,
	MESSAGE,
	COMMUNITIES,
	COURSES,
	CURRENT,
	PAST,
	CURRENT_SEMESTER,
} from './constants/index';

/** Displays a CourseList of user's Current and Past Semester courses. 
    Courses will fetch which courses to display from API and pass courses into CourseList.
*/
export function Organizations() {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);

	/** Get courseCatalog from redux store */
	const courseCatalog = useSelector((state) => state.courseCatalog);
	const [loadCatalog, setLoadCatalog] = useState(true);

	const [courses, setCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [confirmDialog, setConfirmDialog] = useState(
		CONFIRM_DIALOG_INITIAL_STATE
	);

	/** Current Semester courses */
	const currentCourses =
		!isLoading && courses
			? courses.filter(
					(course) => course.data.semester.toLowerCase() === CURRENT_SEMESTER
			  )
			: [];

	/** Past Semester Courses */
	const pastCourses =
		!isLoading && courses
			? courses.filter(
					(course) => course.data.semester.toLowerCase() !== CURRENT_SEMESTER
			  )
			: [];

	// State will determine what courses to show in CourseList
	const [active, setActive] = useState(COMMUNITIES);
	const toggleCourses = (e) => {
		setActive(e.target.id);
	};

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	/** Prompts Confirmation Dialog to Delete Post ********/
	const addCoursePrompt = (courseData) => {
		setConfirmDialog({
			isOpen: true,
			title: `Add ${courseData.courseName}?`,
			subtitle: '',
			onConfirm: () => {
				addCourse(courseData);
			},
		});
	};

	const addCourse = (courseData) => {
		dispatch(addCourseToFB(courseData, currentUser.uid));
		setShowForm(false);
		setConfirmDialog(CONFIRM_DIALOG_INITIAL_STATE);
		/** Prompt change made */
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: MESSAGE.addCourse,
				type: MESSAGE.success,
			})
		);
	};

	useEffect(() => {
		const getData = () => {
			db.collection(FB.collection)
				.where(FB.field, FB.filter, currentUser.uid)
				.onSnapshot((snapshot) =>
					setCourses(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);
			setIsLoading(false);
		};
		if (isLoading) {
			getData();
		}
	}, [currentUser, isLoading]);

	useEffect(() => {
		/** get course catalog on page load */
		async function getCourseCatalog() {
			// ! TEMPORARY
			// await dispatch(fetchCourseCatalog());
			setLoadCatalog(false);
		}
		if (!courseCatalog.courses && loadCatalog) {
			getCourseCatalog();
		}
	}, [dispatch, courseCatalog, loadCatalog]);

	// build list of courses, if no courses exist return 'No courses added'
	const courseList = isLoading ? (
		<Loader />
	) : (
		<>
			<CourseList courses={currentCourses} type={CURRENT} />
			<CourseList courses={pastCourses} type={PAST} />
		</>
	);

	const communityList = isLoading ? (
		<Loader />
	) : (
		<>
			<CommunityList courses={currentCourses} type={CURRENT} />
		</>
	);

	if (showForm) {
		return (
			<Modal
				isOpen={showForm}
				content={
					active === COMMUNITIES ? (
						<CommunityForm
							save={addCoursePrompt}
							confirmDialog={confirmDialog}
							setConfirmDialog={setConfirmDialog}
							courses={courses}
						/>
					) : (
						<CourseForm
							save={addCoursePrompt}
							confirmDialog={confirmDialog}
							setConfirmDialog={setConfirmDialog}
							courses={courses}
						/>
					)
				}
				closeModal={toggleForm}
			/>
		);
	}

	return (
		<div className="Courses">
			<div className="Courses-Header Body-Header">
				<div className="Communities">
					<h5
						id="communities"
						className={
							active === COMMUNITIES ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleCourses}>
						Communities
					</h5>
				</div>
				<div className="Courses-Courses">
					<h5
						id="courses"
						className={
							active === COURSES ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleCourses}>
						Courses
					</h5>
				</div>
			</div>
			<div className="Courses__CourseList">
				{active === COMMUNITIES ? communityList : courseList}
			</div>
			<div className="CourseForm p-3">
				<div onClick={toggleForm} className="font-italic">
					<CTAButton
						text={active === COMMUNITIES ? 'Search Communities' : 'Join Class'}
					/>
				</div>
			</div>
		</div>
	);
}
