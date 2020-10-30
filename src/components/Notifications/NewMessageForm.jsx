/** Dependencies */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import SubmitButton from '../general/SubmitButton';
import createFbTimestamp from '../../utils/createFbTimestamp';
import AutocompleteUsers from './AutocompleteUsers';
import './styles/NewMessageForm.css';

/** Form for user to create New Message.
 *  Notifications[Messages] -> NewMessageForm
 *
 * @param 	{function}	send			Function to send New Message Form Data to DB.
 * @param 	{string}	receiverId		User Id of receiver.
 */
function NewMessageForm({ send, receiverId = null }) {
	const userId = useSelector((state) => state.auth.user.uid);

	const FORM_INITIAL_STATE = {
		uid: userId,
		users: [userId],
		count: 0,
		createdAt: createFbTimestamp(),
		lastUpdatedAt: createFbTimestamp(),
		chats: [],
	};

	const CHAT_INITIAL_STATE = {
		content: '',
		uid: userId,
		createdAt: createFbTimestamp(),
	};

	const RECEIVER_INITIAL_STATE = {
		uid: '',
		displayName: '',
	};

	const [receiverUser, setReceiverUser] = useState(RECEIVER_INITIAL_STATE);
	const [formData, setFormData] = useState(FORM_INITIAL_STATE);
	const [chatData, setChatData] = useState(CHAT_INITIAL_STATE);
	const [showOptions, setShowOptions] = useState(false);
	const [errors, setErrors] = useState('');

	/** validates chat data */
	const validateChat = () => {
		if (chatData.content === '') {
			setErrors('Message can not be empty');
			return false;
		}
		return true;
	};

	/**
	 * ! NEED TO MAKE SURE EXISTING MESSAGE BETWEEN BOTH USERS DOES NOT ALREADY EXIST
	 */
	/** Make sure user is sending message to another user and chat is not empty */
	const validateFormData = () => {
		/** Clear any existing errors */
		setErrors('');
		if (formData.users.length < 2) {
			setErrors('User does not exist');
			return false;
		}
		return true;
	};

	/** if user clicks outside of options, showOptions will be set to false */
	function toggleShowOptions(e) {
		if (
			e.target.tagName !== 'LI' ||
			e.target.tagName !== 'UL' ||
			e.target.tagName !== 'INPUT'
		) {
			setShowOptions(false);
		}
	}

	/** Toggles options display */
	function toggleOptions(status) {
		setShowOptions(status);
	}

	/** Clears any errors */
	const resetErrors = () => setErrors('');

	/** Clears both chat and form data */
	const resetFormData = () => {
		setChatData(CHAT_INITIAL_STATE);
		setFormData(FORM_INITIAL_STATE);
		setReceiverUser(RECEIVER_INITIAL_STATE);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		resetErrors();

		if (receiverUser.uid === '') {
			setErrors('User does not exist');
		}

		// if receiverUser and chat message are not empty, push chat into formData
		if (receiverUser.uid !== '' && validateChat()) {
			formData.count += 1;
			formData.users.push(receiverUser.uid);

			if (validateFormData()) {
				send(formData, chatData);
				resetFormData();
			}
		}
	};

	/** Stores receiving user's Id in state */
	const setId = (e) => {
		let { id } = e.target;
		setReceiverUser((fData) => ({
			...fData,
			uid: id,
		}));
	};

	/** Stores receiving user's displayName in state */
	const handleReceiver = (e) => {
		resetErrors();
		let { name, value } = !e.target.dataset.name ? e.target : e.target.dataset;
		setReceiverUser((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	/** Stores state of Chat */
	const handleChatChange = (e) => {
		resetErrors();
		const { name, value } = e.target;
		setChatData((fData) => ({ ...fData, [name]: value }));
	};

	return (
		<div className="NewMessage__Form" onClick={toggleShowOptions}>
			<h4>New Message</h4>
			<form onSubmit={handleSubmit}>
				<AutocompleteUsers
					id={'receiverUser'}
					name="displayName"
					onChange={handleReceiver}
					value={receiverUser.displayName}
					// options={usersList}
					setId={setId}
					placeholder={'Search User...'}
					showOptions={showOptions}
					toggleOptions={toggleOptions}
				/>
				<div className="form-group">
					<textarea
						rows="3"
						id="content"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChatChange}
						name="content"
						value={chatData.content}
						required
					/>
				</div>
				<div className="alert errors">{errors}</div>
				<SubmitButton
					text="Send Message"
					reset={true}
					resetForm={resetFormData}
				/>
			</form>
		</div>
	);
}

NewMessageForm.prototypes = {
	send: PropTypes.func,
	receiverId: PropTypes.string,
};

export default NewMessageForm;
