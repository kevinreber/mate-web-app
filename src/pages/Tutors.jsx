/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import FindTutors from '../components/Tutors/FindTutors';
import BeTutorForm from '../components/Tutors/BeTutorForm';
import db from '../config/fbConfig';
import './styles/Tutors.css';

function Tutor() {
	const currentUser = useSelector((state) => state.auth.user);

	const [isLoading, setIsLoading] = useState(true);
	const [tutors, setTutors] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		function getTutors() {
			db.collection('users')
				.where('isTutor', '==', true)
				.onSnapshot((snapshot) => {
					setTutors(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					);
				});
		}

		function getTutorsAvailability() {
			// const availabilities =
			console.log('getting...');
			tutors.map(async (tutor) => {
				await db
					.collection('users')
					.doc(tutor.id)
					.collection('availability')
					.orderBy('day')
					.get()
					.then((data) => {
						console.log(data.docs);
					});
			});
		}

		if (isLoading) {
			getTutors();
			getTutorsAvailability();
			setIsLoading(false);
		}
	}, [isLoading, tutors]);

	useEffect(() => {
		function getUserTutorInfo() {
			db.collection('users')
				.doc(currentUser.uid)
				.onSnapshot((snapshot) => setUser(snapshot.data()));
		}
		if (currentUser) {
			getUserTutorInfo();
		}
	}, [currentUser]);

	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('findTutor');
	const toggleTutor = (e) => {
		setActive(e.target.id);
	};

	// Toggle form for User to Add Course
	const [showSearch, setShowSearch] = useState(false);
	const toggleSearch = () => setShowSearch((show) => !show);

	const TutorsBody =
		active === 'findTutor' ? (
			<FindTutors tutors={tutors} isLoading={isLoading} />
		) : (
			<BeTutorForm uid={currentUser.uid} user={user} />
		);

	return (
		<div className="Tutors">
			<div className="Tutors-Header Body-Header">
				<div className="Tutor-Find-Tutor">
					<h5
						id="findTutor"
						className={
							active === 'findTutor' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleTutor}>
						Find a Tutor
					</h5>
				</div>
				<div className="Tutor-Be-Tutor">
					<h5
						id="beTutor"
						className={
							active === 'beTutor' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleTutor}>
						Be a Tutor
					</h5>
				</div>
			</div>
			<div className="Tutors__Body">
				{TutorsBody}
				{/* <div className='Courses-CourseList'>{courseList}</div>
			<div className='CourseForm p-3'>
				<div onClick={toggleForm} className='font-italic'>
					<CTAButton text='Join Class' />
				</div>
			</div> */}
			</div>
		</div>
	);
}

export default Tutor;
