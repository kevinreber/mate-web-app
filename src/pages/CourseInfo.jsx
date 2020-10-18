/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';

/** Components & Helpers */
import BackButton from '../components/general/BackButton';
import CourseAssignmentList from '../components/CourseInfo/CourseAssignments/CourseAssignmentList';
import CourseInfoHeader from '../components/CourseInfo/CourseInfoHeader';
import CTAButton from '../components/general/CTAButton';
import Modal from '../components/general/Modal';
import AssignmentForm from '../components/CourseInfo/CourseAssignments/AssignmentForm';
import { addFlashMessage } from '../store/actions/flashMessages';
import db from '../config/fbConfig';
import './styles/CourseInfo.css';

/** Displays Course Information such as assignments and discussion boards
 * Courses -> CourseList -> Course -> CourseInfo
 */
function CourseInfo() {
	const { courseId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();

	const [course, setCourse] = useState(null);
	const [assignments, setAssignments] = useState([]);

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const currentUser = useSelector((state) => state.auth.user);

	const addAssignment = (assignmentData) => {
		db.collection('class')
			.doc(courseId)
			.collection('assignments')
			.add(assignmentData);
		setShowForm(false);
	};


	/** Remove user from course users list */
	const removeCourse = () => {
		db.collection('class').doc(courseId).update({
			users: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
		});
		// redirect user
		history.push('/courses');

		/** Prompt user left course */
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Removed Course',
				type: 'error',
			})
		);
	}

	// get course assignments
	useEffect(() => {
		if (courseId) {
			db.collection('class')
				.doc(courseId)
				.onSnapshot((snapshot) => setCourse(snapshot.data()));
		}

		if (course) {
			db.collection('class')
				.doc(courseId)
				.collection('assignments')
				.orderBy('dueDate', 'asc')
				.onSnapshot((snapshot) =>
					setAssignments(
						snapshot.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					)
				);
		}
	}, [courseId, course]);

	if (showForm) {
		return (
			<Modal
				content={
					<AssignmentForm save={addAssignment} userId={currentUser.uid} />
				}
				closeModal={toggleForm}
			/>
		);
	}

	// const saveEdit = () => {
	// 	setErrors('');
	// 	if (formData.title === '' && formData.title.trim() === '') {
	// 		setErrors('*Can not leave title empty!');
	// 	} else {
	// 		saveChanges();
	// 		// setShowEdit to false
	// 		setShowEdit(false);
	// 	}
	// };

	const courseInfo = course ? (
		<div className="CourseInfo">
			<div className="CourseInfo__BackBtn">
				<BackButton />
			</div>
			<div className="CourseInfo__Header">
				<CourseInfoHeader
					course={course}
					semester={course.semester}
					sections={course.sections}
					title={`${course.course.abbreviation} ${course.course.course_number}`}
					removeCourse={removeCourse}
				/>
			</div>
			<div className="CourseInfo__Body">
				<CourseAssignmentList assignments={assignments} />
			</div>
			<div className="AssignmentForm p-3">
				<p onClick={toggleForm} className="font-italic">
					<CTAButton text="Add Assignment" />
				</p>
			</div>
		</div>
	) : (
		<p>Loading...</p>
	);

	return <>{courseInfo}</>;
}

export default CourseInfo;
