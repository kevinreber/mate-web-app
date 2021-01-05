/** Dependencies */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';
import AutocompleteStudyGroups from '../AutocompleteStudyGroups/AutocompleteStudyGroups';
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog';
import createFbTimestamp from '../../../../utils/createFbTimestamp';
import addUserToCollection from '../../../../utils/addUserToCollection';
import { addFlashMessage } from '../../../../store/actions/flashMessages';
import './styles/StudyGroupForm.css';

/** Form to add a course.
 * StudyGroups -> 'Join Study Group' Button -> Modal -> StudyGroupForm
 *
 * @param {function}	save			Function to save new Study Group to DB.
 * @param {array}		studyGroups		Array of objects containing Study Group data.
 * @param {object}	 	user			Object of current user's data.
 */
function StudyGroupForm({ save, studyGroups, user }) {
	const { uid, displayName, photoURL } = user;
	const history = useHistory();
	const dispatch = useDispatch();

	// ! NEED TO MATCH NEW DB SCHEMA
	// ! WHEN MAKING NEW STUDY GROUP
	// ? is_private SHOULD BE INTEGER NOT BOOL?
	// Form Data
	const INITIAL_STATE = {
		// active: true,
		// private: false,
		// admin: [uid],
		// usersList: [uid],
		// count: 0,
		// maxUsers: null,
		// title: '',
		// createdAt: createFbTimestamp(),
		// lastUpdatedAt: createFbTimestamp(),
		name: '',
		description: '',
		max_students: 0,
		is_private: false,
	};

	const SEARCH_INITIAL_STATE = {
		studyGroupId: '',
		studyGroupTitle: '',
	};

	const [showOptions, setShowOptions] = useState(false);
	const [errors, setErrors] = useState('');
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [searchForm, setSearchForm] = useState(SEARCH_INITIAL_STATE);

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	const handleSearch = (e) => {
		setSearchForm({ studyGroupTitle: e.target.value });
	};

	/** Update state in formData */
	const handleChange = (e) => {
		// handle checkbox
		if (e.target.type === 'checkbox') {
			setFormData((fData) => ({
				...fData,
				is_private: !fData.is_private,
			}));
		} else {
			let { name, value } = !e.target.dataset.name
				? e.target
				: e.target.dataset;

			setFormData((fData) => ({
				...fData,
				[name]: value,
			}));
		}
	};

	/** Stores studyGroupId in state */
	const setId = (e) => {
		let { id } = e.target;
		let { name, value } = !e.target.dataset.name ? e.target : e.target.dataset;

		setSearchForm((fData) => ({
			...fData,
			studyGroupId: id,
			[name]: value,
		}));
		addStudyGroupPrompt(id, value);
	};

	/** Prompts Confirmation Dialog to Add User to Study Group */
	const addStudyGroupPrompt = (id, studyGroupName) => {
		setConfirmDialog({
			isOpen: true,
			title: `Join ${studyGroupName}?`,
			subtitle: '',
			onConfirm: () => {
				const userData = {
					uid,
					displayName,
					photoURL,
					admin: false,
				};
				addUserToCollection('study-group', id, uid, userData);

				history.push(`/study-groups/${id}`);
				dispatch(
					addFlashMessage({
						isOpen: true,
						message: 'Joined Study Group!',
						type: 'success',
					})
				);
			},
		});
	};
	/***************************************************** */

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

	const resetFormData = () => setFormData(INITIAL_STATE);

	/** User must enter in a class with a valid class ID */
	const validateFormData = () => {
		/** Clear any existing errors */
		setErrors('');
		if (!formData.name) {
			setErrors('*Required');
			return false;
		}

		/** is_private must return a 1(private) or 0(not private) */
		if (formData.is_private) {
			formData.is_private = 1;
		} else {
			formData.is_private = 0;
		}
		// if (formData.is_private) {
		// 	setFormData((fData) => ({
		// 		...fData,
		// 		is_private: 1,
		// 	}));
		// } else {
		// 	setFormData((fData) => ({
		// 		...fData,
		// 		is_private: 0,
		// 	}));
		// }

		/** if max_students, verify it is an integer
		 * else change set max_students to 0
		 */
		if (formData.max_students) {
			if (!Number.isInteger(parseInt(formData.max_students))) {
				resetFormData();
				setErrors('*Number must be an Integer');
				return false;
			} else {
				setFormData((fData) => ({
					...fData,
					max_students: parseInt(fData.max_students),
				}));
			}
		} else {
			setFormData((fData) => ({
				...fData,
				max_students: 0,
			}));
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateFormData()) {
			save(formData);
			// Clear state of form
			resetFormData();
		}
	};

	return (
		<div className="StudyGroupForm p-3" onClick={toggleShowOptions}>
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			<form className="container mb-3">
				<AutocompleteStudyGroups
					id={'studyGroup'}
					name="studyGroupTitle"
					onChange={handleSearch}
					value={searchForm.studyGroupTitle}
					options={studyGroups}
					setId={setId}
					placeholder={'find study group...'}
					showOptions={showOptions}
					toggleOptions={toggleOptions}
				/>
			</form>
			<div className="StudyGroupForm__Create">
				<h4>Create Study Group</h4>
				<form className="container mb-3" onSubmit={handleSubmit}>
					<label htmlFor="name" className="float-left">
						Name*
					</label>
					<input
						id="name"
						className="form-control mate-form-input mb-3"
						type="text"
						onChange={handleChange}
						name="name"
						value={formData.name}
						maxLength="30"
						required
					/>
					<small
						className={`char-count ${
							30 - formData.name.length <= 10 ? 'error-limit' : ''
						}`}>
						{30 - formData.name.length} characters remaining
					</small>
					<label htmlFor="description" className="float-left">
						Description*
					</label>
					<input
						id="description"
						className="form-control mate-form-input mb-3"
						type="text"
						onChange={handleChange}
						name="description"
						value={formData.description}
						maxLength="50"
						required
					/>
					<small
						className={`char-count ${
							50 - formData.description.length <= 10 ? 'error-limit' : ''
						}`}>
						{50 - formData.description.length} characters remaining
					</small>
					<div className="StudyGroupForm__Bottom">
						<div className="form-group max-users">
							<label htmlFor="max" className="float-left">
								Max Students*
							</label>
							<input
								id="max"
								className="form-control mate-form-input"
								type="number"
								onChange={handleChange}
								name="max_students"
								value={formData.max_students}
								required
							/>
						</div>
						<div className="form-group form-check">
							<label htmlFor="private">Private</label>
							<input
								id="private"
								className="form-control mate-form-input form-check-input"
								type="checkbox"
								onChange={handleChange}
								name="private"
								value={formData.is_private}
							/>
							{/* <FormControlLabel
							control={
								<PrivateCheckbox
									checked={formData.private}
									onChange={handleChange}
									name="private"
								/>
							}
							label="Private"
						/> */}
						</div>
					</div>

					<div className="alert errors">{errors}</div>
					<SubmitButton text="Create Group" />
				</form>
			</div>
		</div>
	);
}

StudyGroupForm.propTypes = {
	save: PropTypes.func,
	studyGroups: PropTypes.array,
	user: PropTypes.object,
};

export default StudyGroupForm;
