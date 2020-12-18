/** Dependencies */
import React, { useState } from 'react';

/** Components & Helpers */
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog';
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';
import Autocomplete from '../../../../components/Autocomplete/Autocomplete';
import { COMMUNITY_FORM_DATA_INITIAL_STATE } from '../../constants/index';

/** Form to add a course.
 * Organizations -> 'Search Communities' Button -> Modal -> CommunityForm
 */
function CommunityForm({ save, confirmDialog, setConfirmDialog, courses }) {
	const [errors, setErrors] = useState('');
	const [formData, setFormData] = useState(COMMUNITY_FORM_DATA_INITIAL_STATE);

	/** Update state in formData */
	const handleChange = (e) => {
		let { name, value } = !e.target.dataset.name ? e.target : e.target.dataset;

		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	/** Stores courseId in state */
	const setId = (e) => {
		let { id } = e.target;

		setFormData((fData) => ({
			...fData,
			id: id,
		}));
	};

	/** User must enter in a class with a valid class ID */
	const validateFormData = () => {
		/** Clear any existing errors */
		setErrors('');
		if (!formData.id) {
			setErrors('Course does not exist');
			return false;
		}
		if (!formData.semester) {
			setErrors('Invalid semester');
			return false;
		}
		if (!formData.year) {
			setErrors('Invalid year');
			return false;
		}
		// Check if course is already added to user's course list
		for (let course of courses) {
			if (course.id === formData.id) {
				setErrors('Course Already added!');
				return false;
			}
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateFormData()) {
			save(formData);

			// Reset form data
			setFormData(COMMUNITY_FORM_DATA_INITIAL_STATE);
		}
	};

	return (
		<div className="CourseForm p-3">
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			<h4>Join Community</h4>
			<form className="container mb-3" onSubmit={handleSubmit}>
				<Autocomplete
					id={'courseName'}
					name="courseName"
					onChange={handleChange}
					value={formData.name}
					label={'Search'}
					// options={courseCatalog.courses}
					type={'courses'}
					setId={setId}
					placeholder={'ex: COMPSCI 61A'}
				/>
				<div className="form-group CourseFormSemesterFields">
					<select
						id="courseSemester"
						className="form-control mate-form-input mr-2"
						onChange={handleChange}
						name="courseSemester"
						value={formData.semester}>
						<option className="option-disabled" value="" disabled>
							Semester
						</option>
						<option>Fall</option>
						<option>Spring</option>
						<option>Summer</option>
					</select>
					<select
						id="courseYear"
						className="form-control mate-form-input ml-2"
						onChange={handleChange}
						name="courseYear"
						value={formData.year}>
						<option className="option-disabled" value="" disabled>
							Year
						</option>
						<option>2021</option>
						<option>2020</option>
						<option>2019</option>
						<option>2018</option>
						<option>2017</option>
						<option>2016</option>
					</select>
				</div>
				<div className="alert errors">{errors}</div>
				<SubmitButton text="Join" />
			</form>
		</div>
	);
}

export default CommunityForm;
