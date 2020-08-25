import React, { useState } from 'react';
import Modal from '../../general/Modal';
import BackButton from '../../general/BackButton';

/** Displays Study Group's Chat Header and toggle admin settings
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat -> StudyGroupChatHeader
 */
function StudyGroupChatHeader({ title }) {
	const [showAdmin, setShowAdmin] = useState(false);

	if (showAdmin) {
		return <Modal />;
	}

	return (
		<>
			<BackButton />
			<h5>{title}</h5>
		</>
	);
}

export default StudyGroupChatHeader;