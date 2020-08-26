import React, { useState, useEffect } from 'react';
import CTAButton from '../components/general/CTAButton';
import Autocomplete from '../components/general/Autocomplete';
import NoData from '../components/general/NoData';
import StudyGroupList from '../components/studyGroups/StudyGroupList';
import db from '../config/fbConfig';

function Connect() {
	const [studyGroups, setStudyGroups] = useState([]);

	useEffect(() => {
		db.collection('study-group').onSnapshot((snapshot) =>
			setStudyGroups(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
	}, []);

	const List =
		studyGroups && studyGroups.length !== 0 ? (
			<StudyGroupList studyGroups={studyGroups} />
		) : (
			<NoData text={'study groups'} />
		);

	return (
		<>
			<div className='Body-Header d-block'>
				<h5 className=''>My Study Groups</h5>
				<Autocomplete />
			</div>
			<div className='Courses-CourseList'>{List}</div>
			<div className='CourseForm p-3'>
				{/* <p onClick={toggleForm} className='font-italic'> */}
				<CTAButton text='Add Study Group' />
				{/* </p> */}
			</div>
		</>
	);
}

export default Connect;