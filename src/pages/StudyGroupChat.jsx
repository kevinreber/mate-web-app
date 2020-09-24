/** Dependencies */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

/** Components & Helpers */
import NoData from '../components/general/NoData';
import StudyGroupChatAdmin from '../components/StudyGroupChat/StudyGroupChatAdmin';
import Modal from '../components/general/Modal';
import BackButton from '../components/general/BackButton';
import StudyGroupChatFooter from '../components/StudyGroupChat/StudyGroupChatFooter';
import createFbTimestamp from '../utils/createFbTimestamp';
import { addFlashMessage } from '../store/actions/flashMessages';
import { increment } from '../config/fbConfig';
import db from '../config/fbConfig';
import './styles/StudyGroupChat.css';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

/** Displays Study Group's Chat
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupChat() {
	const { studyGroupId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.auth.user);

	const INITIAL_STATE = {
		title: '',
		members: [],
	};
	const [studyGroup, setStudyGroup] = useState({});
	const [studyGroupForm, setStudyGroupForm] = useState(INITIAL_STATE);
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [showAdmin, setShowAdmin] = useState(false);
	const toggleAdmin = () => setShowAdmin((show) => !show);

	/** Scroll to Bottom of Chat */
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	useEffect(() => {
		if (studyGroupId) {
			/** Get Study Group Info */
			db.collection('study-group')
				.doc(studyGroupId)
				.onSnapshot((snapshot) => setStudyGroup(snapshot.data()));

			/** Get Study Group Messages */
			db.collection('study-group')
				.doc(studyGroupId)
				.collection('messages')
				.orderBy('createdAt', 'asc')
				.onSnapshot((snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					)
				);

			// Verify if user has access to Study Group Chat
			// if (isLoading && studyGroup.users) {
			// 	const userAccess = studyGroup.users.some(
			// 		(user) => user.uid === currentUser.uid
			// 	);
			// 	if (!userAccess) {
			// 		history.push('/study-groups');
			// 		/** Prompt change made */
			// 		dispatch(
			// 			addFlashMessage({
			// 				isOpen: true,
			// 				message: 'Unauthorized Access',
			// 				type: 'error',
			// 			})
			// 		);
			// 	}
			// }

			// add studyGroup.title value to input in StudyGroupChatAdmin
			// if user wants to change Study Group's title
			if (isLoading && studyGroup.title) {
				setStudyGroupForm({
					title: studyGroup.title,
					members: studyGroup.members,
				});
				setIsLoading(false);
			}
		}
	}, [studyGroupId, studyGroup, isLoading]);

	const handleChange = (e) => {
		if (e === 'reset') {
			setStudyGroupForm((fData) => ({ ...fData, title: studyGroup.title }));
		} else {
			const { name, value } = e.target;
			setStudyGroupForm((fData) => ({ ...fData, [name]: value }));
		}
	};

	const updateStudyGroupTitle = () => {
		/** update DB and make change */
		db.collection('study-group').doc(studyGroupId).update({
			title: studyGroupForm.title,
			lastUpdatedAt: createFbTimestamp(),
		});
		/** Prompt change made */
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Changes Saved',
				type: 'success',
			})
		);
	};

	if (!studyGroup) {
		return <p>Loading...</p>;
	}

	if (showAdmin) {
		return (
			<Modal
				content={
					<StudyGroupChatAdmin
						studyGroupId={studyGroupId}
						title={studyGroupForm.title}
						members={studyGroup.users}
						currentUser={currentUser}
						handleChange={handleChange}
						saveChanges={updateStudyGroupTitle}
					/>
				}
				closeModal={toggleAdmin}
				full={true}
			/>
		);
	}

	const sendMessage = (message) => {
		try {
			db.collection('study-group')
				.doc(studyGroupId)
				.collection('messages')
				.add(message);
			db.collection('study-group').doc(studyGroupId).update({
				count: increment,
				lastUpdatedAt: createFbTimestamp(),
			});
		} catch (err) {
			console.log(err);
		}
	};

	/** Display Study Group's Chat Messages */
	const StudyGroupChatBody =
		messages && messages.length !== 0 ? (
			messages.map((message, index) => {
				const lastMessage = messages.length - 1 === index;
				return (
					<div id={message.id} ref={lastMessage ? setRef : null}>
						<p
							className={`StudyGroupChatBody__message chat__message ${
								currentUser.uid === message.data.uid ? 'chat__receiver' : ''
							}`}>
							{currentUser.uid !== message.data.uid ? (
								<span className="chat__name">{message.data.displayName}</span>
							) : (
								''
							)}
							{message.data.message}
							<span className="chat__timestamp">
								{message.data.createdAt
									? moment(message.data.createdAt.toDate()).calendar()
									: ''}
							</span>
						</p>
					</div>
				);
			})
		) : (
			<NoData text="messages" />
		);

	return (
		<div className="StudyGroupChat">
			<div className="StudyGroupChat__Header Body-Header bottom-border-header">
				<BackButton />
				<h5 className="StudyGroupChat__Title">{studyGroup.title}</h5>
				<IconButton onClick={toggleAdmin}>
					<MoreHorizOutlinedIcon fontSize="small" />
				</IconButton>
			</div>
			<div
				id="StudyGroupChat__Body"
				className="StudyGroupChat__Body Page__Body">
				{StudyGroupChatBody}
			</div>
			<div className="StudyGroupChat__Footer">
				<StudyGroupChatFooter send={sendMessage} user={currentUser} />
			</div>
		</div>
	);
}

export default StudyGroupChat;
