/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Components */
import CTAButton from '../../components/CTAButton/CTAButton';
import Searchbar from '../../components/SearchBar/Searchbar';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/layout/Loader/Loader';
import NoData from '../../components/NoData/NoData';
import StudyGroupList from './components/StudyGroupList/StudyGroupList';
import StudyGroupForm from './components/StudyGroupForm/StudyGroupForm';

/** Helpers */
import { addFlashMessage } from '../../store/actions/flashMessages';
import createNewMessage from '../../utils/createNewMessage';
import { API } from './api/api';
import { FB, MESSAGE } from './constants/index';
import db from '../../config/fbConfig';
import './StudyGroups.css';

/** Page that displays a list of user's Study Groups */
function Connect() {
	const history = useHistory();
	const dispatch = useDispatch();

	// const currentUser = useSelector((state) => state.auth.user);

	const [userStudyGroups, setUserStudyGroups] = useState([]);
	const [allStudyGroups, setAllStudyGroups] = useState([]);
	const [filter, setFilter] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [getUserStudyGroups, setGetUserStudyGroups] = useState(false);

	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const currentUser = {
		uid: '0771401d-f6a2-4c1a-8965-81b889959437',
	};

	useEffect(() => {
		const getData = async () => {
			// db.collection(FB.collection).onSnapshot((snapshot) =>
			// 	setAllStudyGroups(
			// 		snapshot.docs.map((doc) => ({
			// 			id: doc.id,
			// 			data: doc.data(),
			// 		}))
			// 	)
			// );
			await API.getAllStudyGroups()
				.then((data) => setAllStudyGroups(data.data.study_groups))
				.catch((err) => 'Error:' + console.log(err))
				.finally(() => {
					setIsLoading(false);
					setGetUserStudyGroups(true);
				});
		};
		if (isLoading) {
			getData();
		}
	}, [isLoading]);

	useEffect(() => {
		if (getUserStudyGroups) {
			// Filter which Study Groups user is currently in
			const studyGroups = allStudyGroups.filter((studyGroup) => {
				return studyGroup.members.filter(
					(member) => member.id === currentUser.uid
				);
			});
			setUserStudyGroups(studyGroups);
			setIsLoading(false);
		}
	}, [allStudyGroups, currentUser.uid, getUserStudyGroups]);

	let List;

	if (filter !== '' && userStudyGroups && userStudyGroups.length !== 0) {
		// filter study groups to display
		const filteredGroups = userStudyGroups.filter(
			(studyGroup) =>
				studyGroup.data.title.toLowerCase().indexOf(filter.toLowerCase()) > -1
		);

		// if no filtered matches, display 'NoData' component
		List =
			filteredGroups.length > 0 && !isLoading ? (
				<StudyGroupList studyGroups={filteredGroups} />
			) : (
				<NoData text={'matches'} added={false} />
			);
	} else if (userStudyGroups && userStudyGroups.length !== 0 && !isLoading) {
		List = <StudyGroupList studyGroups={userStudyGroups} />;
	}

	const addStudyGroup = async (data) => {
		// store studyGroupId given back
		const newStudyGroupId = await createNewMessage(
			FB.collection,
			data,
			null,
			null,
			currentUser
		);

		// push user to message
		history.push(`/study-groups/${newStudyGroupId}`);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: MESSAGE.studyGroupCreated,
				type: MESSAGE.success,
			})
		);
	};

	if (showForm) {
		return (
			<Modal
				isOpen={showForm}
				content={
					<StudyGroupForm
						save={addStudyGroup}
						studyGroups={allStudyGroups}
						user={currentUser}
					/>
				}
				closeModal={toggleForm}
				full={true}
			/>
		);
	}

	return (
		<div className="StudyGroups">
			<div className="StudyGroups__Header">
				<h5>My Study Groups</h5>
				<Searchbar value={filter} setValue={setFilter} />
			</div>
			<div className="StudyGroups__Body">
				{isLoading ? <Loader /> : <>{List}</>}
			</div>
			<div className="CourseForm p-3">
				<div onClick={toggleForm} className="font-italic">
					<CTAButton text="Add Study Group" />
				</div>
			</div>
		</div>
	);
}

export default Connect;
