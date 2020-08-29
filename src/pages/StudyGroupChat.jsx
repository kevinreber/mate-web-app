import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StudyGroupChatHeader from '../components/studyGroups/studyGroupChat/StudyGroupChatHeader';
import StudyGroupChatBody from '../components/studyGroups/studyGroupChat/StudyGroupChatBody';
import StudyGroupChatFooter from '../components/studyGroups/studyGroupChat/StudyGroupChatFooter';
import db from '../config/fbConfig';
import './styles/StudyGroupChat.css';

/** Displays Study Group's Chat
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupChat() {
	const { studyGroupId } = useParams();
	const currentUser = useSelector((state) => state.auth.user);

	const [studyGroup, setStudyGroup] = useState({});
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (studyGroupId) {
			db.collection('study-group')
				.doc(studyGroupId)
				.onSnapshot((snapshot) => setStudyGroup(snapshot.data()));

			db.collection('study-group')
				.doc(studyGroupId)
				.collection('messages')
				.orderBy('timestamp', 'asc')
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [studyGroupId]);

	if (!studyGroup) {
		return <p>Loading...</p>;
	}

	const sendMessage = (message) => {
		try {
			db.collection('study-group')
				.doc(studyGroupId)
				.collection('messages')
				.add(message);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='StudyGroupChat'>
			<div className='StudyGroupChat__Header Body-Header bottom-border-header'>
				<StudyGroupChatHeader title={studyGroup.title} />
			</div>
			<div className='StudyGroupChat__Body Page__Body'>
				<StudyGroupChatBody
					messages={messages}
					username={currentUser.displayName}
				/>
			</div>
			<div className='StudyGroupChat__Footer'>
				<StudyGroupChatFooter
					send={sendMessage}
					username={currentUser.displayName}
				/>
			</div>
		</div>
	);
}

export default StudyGroupChat;
